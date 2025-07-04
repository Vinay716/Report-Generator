

// Event listener for adding tasks to the first section
document.getElementById('add-btn').addEventListener('click', function() {
    addTask('task-input', 'task-list');
});

// Event listener for adding tasks to the second section
document.getElementById('add-btn-three').addEventListener('click', function() {
    addMultipleTasks();
});

// Event listener for adding tasks to the third section
document.getElementById('add-btn-two').addEventListener('click', function() {
    addTwoColumnTasks();
});

document.getElementById('sso-span').addEventListener('click', function() {
    this.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;

            // Check if the active element is a button or a similar element
            if (activeElement.tagName === 'BUTTON' || 
                (activeElement.tagName === 'INPUT' && activeElement.type === 'button')) {
                // Simulate a click on the focused button
                activeElement.click();
            } else {
                // Prevent the form from submitting
                e.preventDefault();

                // Move focus to the next focusable element
                const focusableElements = form.querySelectorAll('input, button, textarea, select');
                let index = Array.prototype.indexOf.call(focusableElements, activeElement);

                if (index >= 0 && index < focusableElements.length - 1) {
                    focusableElements[index + 1].focus();
                }
            }
        }
    });
});
 // Ensure list HTML is set on form submit
 document.getElementById("prev-btn-2").addEventListener('submit', function() {
    const taskList1 = document.getElementById('task-list');
    const taskList2 = document.getElementById('task-list2'); 
    const taskList3 = document.getElementById('task-list3'); 
    // console('means buttons fun. isworking ')
    const listHtmlHidden1 = document.getElementById('list-html-hidden');
    const listHtmlHidden2 = document.getElementById('list-html-hidden2');
    const listHtmlHidden3 = document.getElementById('list-html-hidden3');
    listHtmlHidden1.value = taskList1.innerHTML;
    listHtmlHidden2.value = taskList2.innerHTML;
    listHtmlHidden3.value = taskList3.innerHTML;
    
   
});

// Function to add a single task to a section
function addTask(inputId, listId) {
    const taskInput = document.getElementById(inputId); // Get the input element
    const taskList = document.getElementById(listId); // Get the list element
    const listHtmlHidden1 = document.getElementById('list-html-hidden1');
    
   
    
    // Check if the input value is not empty
    if (taskInput.value.trim() !== '') {
        const taskItem = document.createElement('li'); // Create a new list item
        taskItem.style.borderBottom = '1px solid #ddd';
        taskItem.className = 'todo-item'; // Add a class to the list item
        
        const taskText = document.createElement('span'); // Create a span for the task text
        taskText.innerText = taskInput.value; // Set the span text to the input value
        
        const deleteBtn = document.createElement('button'); // Create a delete button
        deleteBtn.innerText = 'Delete'; // Set the button text
        deleteBtn.className = 'delete-btn'; // Add a class for styling
        
        

        // Add an event listener to the delete button to remove the list item when clicked
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem);
        });
        
        taskItem.appendChild(taskText); // Append the task text to the list item
        taskItem.appendChild(deleteBtn); // Append the delete button to the list item
        
        taskList.appendChild(taskItem); // Append the list item to the task list
        listHtmlHidden1.value = taskList.innerHTML;
        taskInput.value = ''; // Clear the input box
        taskInput.focus(); // Focus on the input box
    }
}


// Function to add multiple tasks to the second section
function addMultipleTasks() {
    const taskInput1 = document.getElementById('task-input1'); // Get the first input element
    const taskInput2 = document.getElementById('task-input2'); // Get the second input element
    const taskInput3 = document.getElementById('sso-span'); // Get the third input element
    const taskList = document.getElementById('task-list2'); // Get the task list element
    const listHtmlHidden2 = document.getElementById('list-html-hidden2');
   
    
    // Check if any of the input values are not empty
    if ((taskInput1.value.trim() !== '' || taskInput2.value.trim() !== '') ) {
        const taskItem = document.createElement('li'); // Create a new list item
        taskItem.className = 'todo-item-row'; // Add a class to the list item
        
        const taskColumn1 = document.createElement('span'); // Create a span for the first column
        taskColumn1.className = 'todo-item-column'; // Add a class to the span
        taskColumn1.innerText = taskInput1.value; // Set the span text to the first input value

        const taskColumn2 = document.createElement('span'); // Create a span for the second column
        taskColumn2.className = 'todo-item-column'; // Add a class to the span
        taskColumn2.innerText = taskInput2.value; // Set the span text to the second input value

        const taskColumn3 = document.createElement('span'); // Create a span for the third column
        taskColumn3.className = 'todo-item-column'; // Add a class to the span
        if (taskInput3.classList.contains('active')) {
            taskColumn3.innerText = "SSO"; // Set the span text to "SSO" when checked
            taskInput3.classList.remove('active'); 
        } else {
            taskColumn3.innerText = ""; // Clear the span text when unchecked
        }
        const deleteBtn = document.createElement('button'); // Create a delete button
        deleteBtn.className = 'delete-btn'; // Add a class to the delete button
        deleteBtn.innerText = 'Delete'; // Set the button text
        // Add an event listener to the delete button to remove the list item when clicked
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem);
        });
        
        taskItem.appendChild(taskColumn1); // Append the first column to the list item
        taskItem.appendChild(taskColumn2); // Append the second column to the list item
        taskItem.appendChild(taskColumn3); // Append the third column to the list item
        taskItem.appendChild(deleteBtn); // Append the delete button to the list item
        
        taskList.appendChild(taskItem); // Append the list item to the task list
        listHtmlHidden2.value = taskList.innerHTML;
        taskInput1.value = ''; // Clear the input boxes
        taskInput2.value = '';
        taskInput3.checked = false;
        taskInput1.focus(); // Focus on the first input box
    } 
  
}

// Function to add tasks to the third section (two columns)
function addTwoColumnTasks() {
    const taskInput4 = document.getElementById('task-input4'); // Get the fourth input element
    const taskInput5 = document.getElementById('task-input5'); // Get the fifth input element
    const taskList = document.getElementById('task-list3'); // Get the task list element
    const listHtmlHidden3 = document.getElementById('list-html-hidden3');
   
    
    // Check if any of the input values are not empty
    if (taskInput4.value.trim() !== '' || taskInput5.value.trim() !== '') {
        const taskItem = document.createElement('li'); // Create a new list item
        taskItem.className = 'todo-item-row'; // Add a class to the list item
        
        const taskColumn1 = document.createElement('span'); // Create a span for the first column
        taskColumn1.className = 'todo-item-column'; // Add a class to the span
        taskColumn1.innerText = taskInput4.value; // Set the span text to the fourth input value

        const taskColumn2 = document.createElement('span'); // Create a span for the second column
        taskColumn2.className = 'todo-item-column'; // Add a class to the span
        taskColumn2.innerText = taskInput5.value; // Set the span text to the fifth input value

        const deleteBtn = document.createElement('button'); // Create a delete button
        deleteBtn.className = 'delete-btn'; // Add a class to the delete button
        deleteBtn.innerText = 'Delete'; // Set the button text
        // Add an event listener to the delete button to remove the list item when clicked
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem);
        });
        
        taskItem.appendChild(taskColumn1); // Append the first column to the list item
        taskItem.appendChild(taskColumn2); // Append the second column to the list item
        taskItem.appendChild(deleteBtn); // Append the delete button to the list item
        
        taskList.appendChild(taskItem); // Append the list item to the task list
        listHtmlHidden3.value = taskList.innerHTML;
        taskInput4.value = ''; // Clear the input boxes
        taskInput5.value = '';
        taskInput4.focus(); // Focus on the first input box
    }
}



// Function to collect data from a section with single-column tasks
function collectDataFromSection(listId) {
    const taskList = document.getElementById(listId); // Get the task list element
    const rows = []; // Initialize an array to hold the data

    // Loop through each task item in the task list
    taskList.querySelectorAll('.todo-item').forEach(item => {
        const taskText = item.querySelector('span').innerText; // Get the task text
        rows.push([taskText]); // Add the task text to the array
    });

    return { "rows": rows }; // Return the data array
}

// Function to collect data from a section with multi-column tasks
function collectDataFromSectionWithColumns(listId, numColumns) {
    const taskList = document.getElementById(listId); // Get the task list element
    const rows = []; // Initialize an array to hold the data

    // Loop through each task item in the task list
    taskList.querySelectorAll('.todo-item-row').forEach(row => {
        const columns = []; // Initialize an array to hold the columns data
        row.querySelectorAll('.todo-item-column').forEach(column => {
            columns.push(column.innerText); // Get the column text and add it to the columns array
        });
        rows.push(columns); // Add the columns array to the rows array
    });

    return { "rows": rows }; // Return the data array
}

