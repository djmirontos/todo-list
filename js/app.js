let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [
    {
        content: 'content task 1',
        status: 'doing'
    },
    {
        content: 'content task 2',
        status: 'complete'
    }
];

// check if has data listTask in localStorage
if (localStorage.getItem('listTask')!=null) {
    listTask = JSON.parse(localStorage.getItem('listTask'));
}

// This function is to save the task to local storage
// so that they will not disappear when close the browser
function saveLocalStorage() {
    localStorage.setItem('listTask', JSON.stringify(listTask));
}

// Every time click the button
// the page reload
// add this code to fix it.
btnAdd.onclick = function(event){
    event.preventDefault();
// get data content task you write
let content = document.getElementById('task').value;
// we only continue if the content not empty
if(content != ''){
// use unshift to add to the beginning of the array
    listTask.unshift({
        content: content,
        status: 'doing'
    })
}

//fun function addTaskToHTML to refresh page
addTaskToHTML();

// after adding, delete the content in the form
document.getElementById('task').value = ''

// When refresh or close the browser, newly added data is not saved
// run the saveLocalStorage function to udpate data listTask arry in localStorage
saveLocalStorage();
}

// create a function to put task data out of HTML
function addTaskToHTML(){
    list.innerHTML = '';
    listTask.forEach((task, index) => {
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML = `
        <div class="complete-icon" onClick="completeTask(${index})">
            <img src="./images/check-mark.png" alt="">
        </div>

        <div class="content">${task.content} </div>

        <div class="close-icon" onClick="deleteTask(${index})">
            <img src="./images/cancel.png" alt="">
        </div>
        `;
        // add newTask in class list
        list.appendChild(newTask);
    })
}

addTaskToHTML();

// when click complete icon, run function completeTask to change status task
// index is order position this task in array
function completeTask(index){
    listTask[index].status = 'complete';
    // run addTasktoHMTL to reload
    addTaskToHTML();
    // Everytime data listTask change.
    // run the saveLocalStorage function again so that it save the new data
    saveLocalStorage();
}

// when click close icon, run function deleteTask to delete the task
function deleteTask(index){
    // use filter to filter out tasks whose location is different from passed index
    listTask = listTask.filter((task, newIndex) => { return newIndex != index})
    addTaskToHTML();
    // run saveLocalStorage again to save the data
    saveLocalStorage();
}