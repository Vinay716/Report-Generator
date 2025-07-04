document.addEventListener('DOMContentLoaded', (event) => {    // is switch on when the html is loaded on the computer
    fetch('/vanribality/')
        .then(response => response.json())
        .then(data => {
            //console.log('Fetched Data:', data); // Log the raw JSON response

            // Check the first item in the array to see the field names
            // if (data.length > 0) {
            //     console.log('First Item:', data[0]); // Log the first item to verify the field names
            // }

            // Use the correct field names based on the log
            const vanribalityList = data.map(item => ({
                Vanribality: item.Vanribality,
                Risk: item.Risk,
                Discription: item.Discription,
                Impact: item.Impace,
                Recommendation: item.Recommendation
            }));
            // console.log('Vanribality List:', vanribalityList); // Log the extracted vanribality list

            setupAutocomplete(vanribalityList);

        })
        .catch(error => console.error('Error fetching vanribality data:', error));

        const html1 = document.getElementById('html1').value;
        const scops = collectDataFromSection(html1);
        Applications(scops);

});
function setupAutocomplete(vanribalityList) {
    const sorted_Vanribality = vanribalityList.sort((a, b) => a.Vanribality.localeCompare(b.Vanribality));
    // console.log(sorted_Vanribality);

    const textarea6 = document.getElementById('task-input6');
    const textarea7 = document.getElementById('task-input7');

    textarea6.addEventListener("keyup", (e) => {
        removeElements();
        const value = textarea6.value.toLowerCase();
        for (let item of sorted_Vanribality) {
            if (item.Vanribality.toLowerCase().startsWith(value) && value.trim() !== "") {
                let listItem = document.createElement("li");
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                listItem.addEventListener("click", () => displayNames(item));

                const highlightLength = textarea6.value.length;
                const word = "<b>" + item.Vanribality.substr(0, highlightLength) + "</b>" + item.Vanribality.substr(highlightLength);
                // console.log(item.Vanribality);
                listItem.innerHTML = word;
                document.querySelector(".list1").appendChild(listItem);
                     
            }
        }
        
    });
    

    
    
    function displayNames(item) {                       // give data to another scripts
        textarea6.value = item.Vanribality;
        window.Discription = item.Discription;
        window.Impact = item.Impact;
        window.Recommendation = item.Recommendation;
        textarea7.value = item.Risk;
        removeElements();
    }

    function removeElements() {                        // removes all the list in the previous results
        let items = document.querySelectorAll(".list-items");
        items.forEach((item) => {
            item.remove();
        });
    }
}

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

function Applications(vanribalityList) {
    const sorted_Vanribality = vanribalityList.rows.sort((a, b) => a[0].localeCompare(b[0]));
    const textarea8 = document.getElementById('task-input8');

    textarea8.addEventListener("focus", (e) => {
        removeElements();
        console.log("ON select works")
        for (let item of sorted_Vanribality) {
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.addEventListener("click", () => displayNames(item));
            console.log("looping")
            const highlightLength = textarea8.value.length;
            const word = "<b>" + item[0].substr(0, highlightLength) + "</b>" + item[0].substr(highlightLength);
            listItem.innerHTML = word;
            document.querySelector(".list2").appendChild(listItem);
            
        }
    });

    function displayNames(item) {
        textarea8.value = item[0];
        removeElements();
    }

    function removeElements() {
        let items = document.querySelectorAll(".list-items");
        items.forEach((item) => {
            item.remove();
        });
    }
}