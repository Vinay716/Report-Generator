document.getElementById('add-btn-four').addEventListener('click', function() {
    addFourColumnTasks();
    window.Discription = "";
    window.Impact = "";
    window.Recommendation = "";
});

const auto_grow = (element) => {
    element.style.height = "5px"; // Reset to a small height to recalculate correctly
    element.style.height = (element.scrollHeight - 9) + "px"; // Set to the scroll height
};


// use to create 3 textareas 
function addFourColumnTasks() {
    const taskInput6 = document.getElementById('task-input6');
    const taskInput7 = document.getElementById('task-input7');
    const taskInput8 = document.getElementById('task-input8');
    const taskList = document.getElementById('task-list4');

    if (taskInput6.value.trim() !== '' || taskInput7.value.trim() !== '' || taskInput8.value.trim() !== '') {
        const taskItem = document.createElement('li');
        taskItem.className = 'todo-item-row';

        const indexColumn = document.createElement('span');
        indexColumn.className = 'todo-item-column';
        indexColumn.style.maxWidth = '40px';
        indexColumn.innerText = taskList.childElementCount + 1;

        const taskColumn6 = document.createElement('span');
        taskColumn6.className = 'todo-item-column';
        taskColumn6.innerText = taskInput6.value;

        const taskColumn7 = document.createElement('span');
        taskColumn7.className = 'todo-item-column';
        taskColumn7.style.maxWidth = '100px';
        taskColumn7.innerText = taskInput7.value;

        const taskColumn8 = document.createElement('span');
        taskColumn8.className = 'todo-item-column';
        taskColumn8.innerText = taskInput8.value;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ml-2';
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            updateIndices();
        });

        const mainDiv = document.createElement('div');
        mainDiv.className = 'main-div'

        const oneDiv = document.createElement('div');
        oneDiv.className = 'one-div';
        oneDiv.appendChild(indexColumn);                  // all the data of index, vanribaliy and more
        oneDiv.appendChild(taskColumn6);
        oneDiv.appendChild(taskColumn7);
        oneDiv.appendChild(taskColumn8);
        oneDiv.appendChild(deleteBtn);

        const twoDiv = document.createElement('div');
        twoDiv.className = 'two-div';
        twoDiv.id = 'dynamic-sections';

        mainDiv.appendChild(oneDiv);
        mainDiv.appendChild(twoDiv);
        taskItem.appendChild(mainDiv);

        createSectionsForTask(oneDiv, twoDiv);  // making the twoDiv
        taskList.appendChild(taskItem);
        
        taskInput6.value = '';
        taskInput7.value = '';
        taskInput8.value = '';
        
    }
    updateIndices();
}

function updateIndices() {
    const taskList = document.getElementById('task-list4');
    const items = taskList.querySelectorAll('.todo-item-row');

    items.forEach((item, index) => {
        const indexColumn = item.querySelector('.todo-item-column');
        indexColumn.innerText = index + 1;
    });
}


function createSectionsForTask(taskItem, dynamicSections) {
    dynamicSections.innerHTML = '';

    const taskDetails = {  
        index: taskItem.querySelector('.todo-item-column').innerText,          // all the task Details
        task1: taskItem.querySelectorAll('.todo-item-column')[1].innerText,
        task2: taskItem.querySelectorAll('.todo-item-column')[2].innerText,
        task3: taskItem.querySelectorAll('.todo-item-column')[3].innerText
    };

    const section = document.createElement('div');      // toggle button
    section.classList.add('individual-section');
    section.setAttribute('data-index', taskDetails.index);
    const toggleButton = document.createElement('button');
    toggleButton.type = "button";
    toggleButton.classList.add('toggle-button');

    const container = document.createElement('div');
    container.classList.add('content-container','flex-column', 'gap-2');


     // all the textareas
    const createStyledTextArea = (placeholder, value = '') => {
        const editorDiv = document.createElement('div');   // Made a div to contain the CKEditor instance
        
        editorDiv.style.marginBottom = "30px";
        editorDiv.style.width = "97%";
        editorDiv.className = placeholder;
    
        const lable = document.createElement("div");
        lable.className = "names_of_textarea"
        lable.innerText = placeholder;
        // lable.style.textAlign = "center"
        // lable.style.border = "1px solid #a681c5"
        
        // Create the textarea for CKEditor
        const textarea = document.createElement('textarea');
        textarea.placeholder = placeholder;
        textarea.style.display = 'none';  // Hide the original textarea (CKEditor will replace it)
        
        editorDiv.appendChild(lable); 
        editorDiv.appendChild(textarea);  // Add textarea to the div
    
        ClassicEditor.create(textarea, {   // Initialize CKEditor on the textarea
            toolbar: {
                items: [  // Toolbar items
                    
                    'bold', '|',
                    'link', 'bulletedList', 'numberedList', '|',
                    'undo', 'redo', '|',
                
                ]
            },
            list: {
                properties: {
                    styles: true
                }
            }
            // Add plugin to customize the bold command behavior
            // extraPlugins: [CustomBoldPlugin]
        }).then(editor => {
            editor.setData(value);  // Set the initial content
    
            const toolbarElement = editor.ui.view.toolbar.element;
            const editableElement = editor.ui.view.editable.element;
        
            // Initially hide the toolbar
            toolbarElement.style.transition = 'opacity 0.3s ease, height 0.3s ease';
            toolbarElement.style.overflow = 'hidden';
            toolbarElement.style.opacity = '0';
            toolbarElement.style.height = '0';
        
            // Show the toolbar when the editor is focused
            editableElement.addEventListener('focus', () => {
                toolbarElement.style.opacity = '1';
                toolbarElement.style.height = `45px`;  // Adjust the height as needed
            });
        
            // Prevent toolbar from collapsing when clicked
            toolbarElement.addEventListener('mousedown', (event) => {
                event.preventDefault(); // Stop blur event when clicking on the toolbar
            });
        
            // Hide the toolbar when the editor loses focus, but not if the click happens in the toolbar
            editableElement.addEventListener('blur', (event) => {
                // Check if the blur event is related to a toolbar click
                if (!toolbarElement.contains(event.relatedTarget)) {
                    toolbarElement.style.opacity = '0';
                    toolbarElement.style.height = '0';
                }
            });
    
            // Store the CKEditor instance on the div for later access
            editorDiv.ckeditorInstance = editor;
        }).catch(error => {
            console.error(error);
        });
        // Custom Plugin to apply the CSS
        
        return editorDiv;
    };
                                                                                        

    
    
    const createStyledInput = (placeholder, value = '', type = 'text') => {

        const editorDiv = document.createElement('div');   // Made a div to contain the CKEditor instance
        
        editorDiv.style.marginBottom = "30px";
        editorDiv.style.width = "97%";
        editorDiv.className = placeholder;
        editorDiv.style.marginBottom = "0%"
    
        const lable = document.createElement("div");
        lable.className = "names_of_textarea"
        lable.innerText = placeholder;

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.className = placeholder; 
        input.setAttribute('multiple', 'multiple'); // Allow multiple files
        input.value = value;
        input.style.width = '98%';
        input.style.minHeight = '65px';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        editorDiv.appendChild(lable); 
        editorDiv.appendChild(input);  // Add textarea to the div
    
        return editorDiv;
        
    };
    
    const indexLabel = document.createElement('p');
    indexLabel.textContent = `Index: ${taskDetails.index}`;

    const task1Input = createStyledTextArea('Description', window.Discription !== undefined ? window.Discription : "");

    
    const task2Input = createStyledTextArea('Impact', window.Impact !== undefined ? window.Impact : "");

    
    const task3Input = createStyledTextArea('Recommendation', window.Recommendation !== undefined ? window.Recommendation : "");
    
    // const task3Input = createStyledTextArea('Recommendation');
    // task3Input.value = window.Recommendation !== undefined ? window.Recommendation : "";


    
    const imageInputContainer = document.createElement('div');
    imageInputContainer.classList.add('image-input-container', 'mb-3');

    const addImageButton = document.createElement('button');
    addImageButton.innerText = 'Add Image';
    addImageButton.classList.add('add-image-button','btn', 'btn-primary', 'w-100');
    addImageButton.type = "button";

    const createImageInputSection = () => {
        const imageSection = document.createElement('div');
        imageSection.className = 'image-section','mb-2';

        const task2Description1 = createStyledTextArea('Image Description Before');
        const task2FileInput = createStyledInput('Pictures', '', 'file');
        const task2Description2 = createStyledTextArea('Image Description After');

        const deleteImageButton = document.createElement('button'); // Use Font Awesome icon
        deleteImageButton.classList.add('delete-image-button');
        deleteImageButton.addEventListener('click', function() {
            imageInputContainer.removeChild(imageSection);
        });

        imageSection.appendChild(task2Description1);
        imageSection.appendChild(task2FileInput);
        imageSection.appendChild(task2Description2);
        imageSection.appendChild(deleteImageButton);
        return imageSection;
    };

    imageInputContainer.appendChild(createImageInputSection());
    imageInputContainer.appendChild(addImageButton);

    addImageButton.addEventListener('click', function() {
        imageInputContainer.insertBefore(createImageInputSection(), addImageButton);
    });

    container.appendChild(indexLabel);
    container.appendChild(task1Input);
    container.appendChild(task2Input);
    container.appendChild(task3Input);
    container.appendChild(imageInputContainer);

    section.appendChild(toggleButton);    // appending into section because there is toggle button also so more than one element
    section.appendChild(container);

    dynamicSections.appendChild(section); 

    toggleButton.addEventListener('click', () => {
        if (container.style.display === 'none') {
            container.style.display = 'flex';
            toggleButton.style.backgroundImage = "url('/static/Images/close.png')";
        } else {
            container.style.display = 'none';
            toggleButton.style.backgroundImage = "url('/static/Images/open.png')";
        }
    });
    
    container.style.display = 'flex';
    toggleButton.style.backgroundImage = "url('/static/Images/close.png')";
}



 
// const task1Input = createStyledTextArea('Description', window.Discription !== undefined ? window.Discription : "");

    
// const task2Input = createStyledTextArea('Impact', window.Impact !== undefined ? window.Impact : "");


// const task3Input = createStyledTextArea('Recommendation', window.Recommendation !== undefined ? window.Recommendation : "");

// const createStyledTextArea = (placeholder, value = '') => {

//     const editorDiv = document.createElement('div');   //Made a div section to put elements
    
//     editorDiv.style.border = "1px solid #6f42c1";
//     editorDiv.className = placeholder;
    
//     const label = document.createElement('label');     // Makeing the labrl and putting it into the div
//     label.textContent = placeholder;  

//     editorDiv.appendChild(label); 

//     const textarea = document.createElement('textarea'); //Making the textarea and putting it in the div
//     textarea.placeholder = placeholder;
//     textarea.className = "Helloworld";
//     textarea.style.marginBottom = "2000px";
//     textarea.style.minHeight = '55px';
//     textarea.style.padding = '15px';
//     textarea.style.fontSize = '16px';
//     textarea.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif';
//     // textarea.value = value;
//     textarea.addEventListener('input', () => auto_grow(textarea));
//     auto_grow(textarea);

//     ClassicEditor.create(textarea, {   // initialising the ck editor
//         toolbar: {
//             items: [                                                // Toolbar and it's items
//                 'heading', '|',
//         'bold', 'italic', 'underline', 'strikethrough', '|',
//         'link', 'bulletedList', 'numberedList', '|',
//         'undo', 'redo', 'fontBackgroundColor', '|',
//         'blockQuote', 'insertTable', 'mediaEmbed'
//     ]
//         },
//         list: {
//             properties: {
//                 styles: true
//             }
//         }
//     }).then(editor => {
//         // // Set the initial content using CKEditor API
//         editor.setData(value);         // putting the value in the task 
//         console.log(editor.getData());  // printing the value

//         const toolbarElement = editor.ui.view.toolbar.element;  // getting the toolbar 

//         // Initially hide the toolbar
        
//         label.style.transition = 'opacity 0.3s ease, height 0.3s ease';  //ANIMATION here

//         toolbarElement.style.transition = 'opacity 0.3s ease, height 0.3s ease';
//         toolbarElement.style.overflow = 'hidden';
//         toolbarElement.style.opacity = '0';
//         toolbarElement.style.height = '0';

//         // Show the toolbar when the editor is focused
//         editor.ui.view.editable.element.addEventListener('focus', () => {
//             toolbarElement.style.opacity = '1';
//             toolbarElement.style.height = `45px`;
            
//             // label.style.overflow = 'hidden';
//             label.style.opacity = '0';
//             label.style.height = '0';
//         });

//         // Hide the toolbar when the editor loses focus
//         editor.ui.view.editable.element.addEventListener('blur', () => {
//             toolbarElement.style.opacity = '0';
//             toolbarElement.style.height = '0';

//             label.style.opacity = '1';
//             label.style.height = `45px`;
//         });

//     }).catch(error => {
//         console.error(error);
//     });

    
//     editorDiv.appendChild(textarea);  // putting the textarea and returning the div

//     console.log(editorDiv)
//     return editorDiv;
// };

// and a container containes

// container.appendChild(indexLabel);
// container.appendChild(task1Input);
// container.appendChild(task2Input);
// container.appendChild(task3Input);
// container.appendChild(imageInputContainer);

// so now i like to get the data of the ckeditor 