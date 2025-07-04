// Event listener for the submit button
document.getElementById("prev-btn-2").addEventListener('click', function() {
    sendData();
});

const field1 = document.getElementById('field1').value;
const field2 = document.getElementById('field2').value;
const field3 = document.getElementById('field3').value;

const Time = convertDate(field3);

const html1 = document.getElementById('html1').value;
const html2 = document.getElementById('html2').value;
const html3 = document.getElementById('html3').value;


function convertDate(dateString) {
    // Define an array of month names
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Split the input string by commas
    const [year, month,day ] = dateString.split('-');
  
    // Convert the day and month to integers
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
  
    // Get the month name from the array
    const monthName = months[monthInt - 1]; // Subtract 1 since months array is 0-based
  
    // Return the formatted date
    return `${monthName} ${dayInt}, ${year}`;
  }

// Function to collect data from a section with single-column tasks
function collectDataFromSection(taskListHTML) {
    const tempElement = document.createElement('ul');
    tempElement.innerHTML = taskListHTML;
    const rows = [];

    tempElement.querySelectorAll('.todo-item').forEach(item => {
        const taskText = item.querySelector('span').innerText;
        rows.push([taskText]);
    });

    return { "rows": rows };
}

// Function to collect data from a section with multi-column tasks
function collectDataFromSectionWithColumns(taskListHTML) {
    const rows = [];
    const tempElement = document.createElement('ul');
    tempElement.innerHTML = taskListHTML;

    tempElement.querySelectorAll('.todo-item-row').forEach(row => {
        const columns = [];
        row.querySelectorAll('.todo-item-column').forEach(column => {
            columns.push(column.innerText);
        });
        rows.push(columns);
    });

    return { "rows": rows };
}

function dataextratctionmethod(div){
    console.log(div)
    const data = div?.ckeditorInstance?.getData();
    console.log(data)
    return data;     
}

// Function to extract data as JSON, including handling image uploads
function extractDataAsJSON(formData) {
    const taskList = document.getElementById('task-list4');
    const tasks = taskList.getElementsByClassName('todo-item-row');
    const jsonData = {
        fifth_table: {
            row_2_data: [],
            row_3_data: []
        }
    };

    Array.from(tasks).forEach((task, taskIndex) => {
        const columns = task.querySelectorAll('.todo-item-column');
        if (columns.length > 0) {
            const row2Data = [
                columns[0].innerText,
                columns[1].innerText,
                columns[2].innerText,
                columns[3].innerText
            ];
            jsonData.fifth_table.row_2_data.push(row2Data);
        }

        const dynamicSections = task.querySelectorAll('.individual-section');
        // Iterate over each dynamic section
        if (dynamicSections.length > 0) {
            dynamicSections.forEach((section, sectionIndex) => {
                const contentContainer = section.querySelector('.content-container');
                // Retrieve CKEditor instances from the div
                // const description = contentContainer.querySelector('textarea[placeholder="Description"]').value;
                
                // Select the 'Description' element inside the contentContainer
                const descriptionDiv = contentContainer.getElementsByClassName("Description")[0];
                const description = dataextratctionmethod(descriptionDiv) || "";
                 
                const impactDiv = contentContainer.getElementsByClassName("Impact")[0];
                const impact = dataextratctionmethod(impactDiv) || "";
                // const recommendation = contentContainer.querySelector('textarea[placeholder="Recommendation"]').value;
                const recommendationDiv = contentContainer.getElementsByClassName("Recommendation")[0];
                const recommendation = dataextratctionmethod(recommendationDiv) || "";
                
                const imageSections = contentContainer.querySelectorAll('.image-input-container > div');
                // Iterate over each image section
                const images = Array.from(imageSections).map((imageSection, imageIndex) => {
                    const imgDescriptionBeforeDiv = imageSection.getElementsByClassName("Image Description Before")[0];
                    const imgDescriptionBefore = dataextratctionmethod(imgDescriptionBeforeDiv) || "";
    
                    const imgDescriptionAfterDiv = imageSection.getElementsByClassName('Image Description After')[0];
                    const imgDescriptionAfter = dataextratctionmethod(imgDescriptionAfterDiv) || "";

                    
                    // Collect image files from the input
                    const files = Array.from(imageSection.querySelector('input[type="file"]').files);

                    // Iterate over each file
                    const fileNames = files.map((file, fileIndex) => {
                        // Define a unique placeholder for each image
                        const placeholder = `{{IMAGE_PLACEHOLDER_${taskIndex}_${sectionIndex}_${imageIndex}_${fileIndex}}}`;
                        // Append the file to formData with the placeholder as the key
                        formData.append(placeholder, file);
                        return placeholder;
                    }).join(' ');

                    // Combine the image descriptions and placeholders
                    return `${imgDescriptionBefore} ${fileNames} ${imgDescriptionAfter}`;
                });

                jsonData.fifth_table.row_3_data.push([
                    [description],
                    [images.join(' ')],
                    [impact],
                    [recommendation]
                ]);
            });
        }
    });

    return jsonData;
}

// Function to send data to the server
function sendData() {
    const formData = new FormData();// Create a FormData object to hold the data and files
    const section1Data = collectDataFromSection(html1); // Collect data from the first section
    const section2Data = collectDataFromSectionWithColumns(html2); // Collect data from the second section
    const section3Data = collectDataFromSectionWithColumns(html3); // Collect data from the third section
    const jsonData = {
        "heading": "Penetration Test Report",
        "name": field1,                      
        "address": field2,
        "date": Time,
        "Intro": "",
        "first_table": section1Data,
        "second_table": section2Data,
        "third_table": section3Data,
        "Vanriability_table": extractDataAsJSON(formData)   // Extract data and images
    };
    // console.log(jsonData)
    // Append JSON data to FormData
    formData.append('data', JSON.stringify(jsonData));


    // Log FormData content (keys and values)
    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    
    const submit_button = document.getElementById('prev-btn-2');  // submit button which makes files
    const loadingSpinner = document.getElementById('loading'); // loading div
    const fileSpan = document.getElementById('file'); // Reference to the file span
    submit_button.style.display = 'none';
    loadingSpinner.style.display = 'block';

    fetch('/form3/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: formData  // Include FormData as the request body
    })
    .then(response => {
        loadingSpinner.style.display = 'none'; // Hide the spinner when the response is received
        submit_button.style.display = 'block';
        if (response.ok) {
            return response.blob();
        }
        return response.json().then(data => {
            throw new Error(data.message || 'Network response was not ok.');
        });
    })
    .then(blob => {
        if (!blob || !blob.size) {
          console.error('Invalid blob data');
          return;
        }
      
        const url = window.URL.createObjectURL(blob);
        const fileName = 'Report'; // Specify the file name
      
        // Create a download link
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
      
        // Force click to initiate download immediately
        a.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
        // Clean up the URL object after a short delay to avoid premature revocation
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
      })
      .catch(error => {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none'; // Hide the spinner if an error occurs
        submit_button.style.display = 'block';
      });
    return jsonData;
}

// Function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}