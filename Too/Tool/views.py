from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Correct import statement
from .Python_script.main import main
import os

def error_404_view(request,exception):
    return render("400.html")

def home_view(request):
    return redirect('form1')



def form1_view(request):
    print("form1_view")
    if request.method == 'POST':
        # Store form data in session
        request.session['form1_data'] = {
            'field1': request.POST.get('tester_name'),
            'field2': request.POST.get('app_name'),
            'field3': request.POST.get('date'),
        }
        form1_data = request.session.get('form1_data', {'field1': '', 'field2': '', 'field3': ''})
        print(f"Name {form1_data['field1']}")
        print(f"App_Name {form1_data['field2']}")
        print(f"Date {form1_data['field3']}")

        if 'next' in request.POST:
            return redirect(form2_view)  # Use the URL name of form2_view
    else:
        # Retrieve form data from session if available
        form1_data = request.session.get('form1_data', {'field1': '', 'field2': '', 'field3': ''})
    
    return render(request, 'form.html', {'form1_data': form1_data})


def form2_view(request):
    print("form2_view")
    form1_data = request.session.get('form1_data', {'field1': '', 'field2': '', 'field3': ''})
    print(f"{form1_data['field1']} <----- Works")
    if request.method == 'POST':
        print("Hellowwww")
        # Retrieve the form1 data from the session
        

        
        list_html1 = request.POST.get('list_html1',default ='')
        list_html2 = request.POST.get('list_html2',default ='')
        list_html3 = request.POST.get('list_html3',default ='')

        # Update session with the new list HTML
        request.session['list_html1'] = list_html1
        request.session['list_html2'] = list_html2
        request.session['list_html3'] = list_html3

        # Redirect to the next step or another view
        if 'next' in request.POST:
            return redirect(form3_view)  # Replace 'form2' with your actual URL name

    else:
        # Retrieve list HTML from session if available
        list_html1 = request.session.get('list_html1', default ='')
        list_html2 = request.session.get('list_html2', default ='')                 
        list_html3 = request.session.get('list_html3', default ='')
    return render(request, 'form1.html', {'form1_data': form1_data,'list_html1': list_html1 ,'list_html2': list_html2 ,'list_html3': list_html3 })



def form3_view(request):
    form1_data = request.session.get('form1_data', {'field1': '', 'field2': '', 'field3': ''})
    list_html1 = request.session.get('list_html1', default = '')
    list_html2 = request.session.get('list_html2', default = '')
    list_html3 = request.session.get('list_html3', default = '')
    print("HELLO")
    if request.method == 'POST':
        
        list_html4 = request.POST.get('list_html4', '')
        request.session['list_html4'] = list_html4
        
        # Handle multiple image uploads
        try:
            # Load the JSON data
            data = json.loads(request.POST.get('data'))
                
                
            # Handle image files
            images = request.FILES   # SAVE ALL THE IMAGE FILES
            image_paths = {}       # make a 
           
            for placeholder, image in images.items():
                # Save the image to the specified path
                image_path = os.path.join('Tool/User_images/', image.name)
                with open(image_path, 'wb') as f:
                    for chunk in image.chunks():
                        f.write(chunk)
                image_paths[placeholder] = image_path
            

            # Pass the JSON data and image paths to the main function
            template_file = 'Tool/Template_files/output.docx'
            output_file = 'Tool/Template_files/final_output.docx'
            # Ensure the output directory exists
            os.makedirs(os.path.dirname(output_file), exist_ok=True)
            
            # Call the main function with the template file, JSON data, and output file path
            main(template_file, data, output_file, image_paths)
        
            # Load the generated document
            with open(output_file, 'rb') as doc_file:
                document_data = doc_file.read()
            
            # Create a response with the document
            response = HttpResponse(document_data, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = f'attachment; filename="final_output.docx"'
            
             # Cleanup image files after processing
            for image_path in image_paths.values():
                try:
                    if os.path.exists(image_path):
                        os.remove(image_path)
                        print(f"Deleted: {image_path}")
                except Exception as e:
                    print(f"Error deleting file {image_path}. Reason: {e}")

            return response 
        
        except json.JSONDecodeError:
            # print(JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400))
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
        # except Exception as e:
        #     return JsonResponse({'status': 'error', 'message': str(e.with_traceback())}, status=500)
        
        # if 'next' in request.POST:
        #     return redirect(summary_view)

    else:
        list_html4 = request.session.get('list_html4', '')


    return render(request, 'form2.html', {'form1_data': form1_data,'list_html1': list_html1 ,'list_html2': list_html2 ,'list_html3': list_html3 })



def summary_view(request):
    # Retrieve all HTML codes from session
    form1_data = request.session.get('form1_data', {'field1': '', 'field2': '', 'field3': ''})
    list_html1 = request.session.get('list_html1', '')
    list_html2 = request.session.get('list_html2', '')
    list_html3 = request.session.get('list_html3', '')
    list_html4 = request.session.get('list_html4', '')
    print("summary_view",list_html1)
    print("summary_view",list_html2)
    print("summary_view",list_html3)
    return render(request, 'summary.html', {
        'form1_data': form1_data,
        'list_html1': list_html1,
        'list_html2': list_html2,
        'list_html3': list_html3,
        'list_html4': list_html4,
    })


def vanribality_list(request):
    vanribality_objects = Vanribality.objects.all().values()
    vanribality_list = list(vanribality_objects)
    #print(vanribality_list)
    return JsonResponse(vanribality_list, safe=False)

