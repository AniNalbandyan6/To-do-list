//query DOM elemets for input, add button, full list and filtering
const input = document.querySelector("#input");
const addButton = document.querySelector("#add-button");
const list = document.querySelector("#list");
const filter = document.querySelector("#options");

document.addEventListener("DOMContentLoaded", function() {
    getTodos();
});

addButton.addEventListener("click", addTasks);
list.addEventListener("click", deleteFunc);
filter.addEventListener("change", filterTasks);

//function to add new tasks
function addTasks(event) {
    event.preventDefault();
    const div = document.createElement("div");
    div.classList.add("todo");

    //create a task and add to local storage
    const newTask = document.createElement("li");
    newTask.innerText = input.value;
    newTask.classList.add("task");
    div.appendChild(newTask);
    saveChanges(input.value);
    
    //adding the task to the list with delete and done properties
    const completed = document.createElement("button");
    completed.innerHTML = '<i>Done</i>';
    completed.classList.add("comp-button");
    div.appendChild(completed);

    const bin = document.createElement("button");
    bin.innerHTML = '<i>Delete</i>';
    bin.classList.add("bin-button");
    div.appendChild(bin);

    list.appendChild(div);
    input.value = "";
}

//function to delete tasks
function deleteFunc(e) {
    const task = e.target;
    //if delete is clicked remove the task
    if (task.classList.contains("bin-button")) {
        const todo = task.parentElement;
        todo.classList.add("slide");
        remoteLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    //if done button ia clicked, toggle completed class
    if (task.classList.contains("comp-button")) {
        const todo = task.parentElement;
        todo.classList.toggle("completed");
    }
}

//function to filter tasks
function filterTasks(e) {
    const tasks = Array.from(list.childNodes);
    tasks.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                break;
            case "incomplete":
                todo.style.display = todo.classList.contains("completed") ? "none" : "flex";
                break;
        }
    });
}

//saving to the storage
function saveChanges(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//get the tasks from the storage
function getTodos() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        const div = document.createElement("div");
        div.classList.add("task");
        const newTask = document.createElement("li");
        newTask.innerText = task;
        newTask.classList.add("task-item");
        div.appendChild(newTask);

        const completed = document.createElement("button");
        completed.innerHTML = '<i>Done</li>';
        completed.classList.add("comp-button");
        div.appendChild(completed);

        const bin = document.createElement("button");
        bin.innerHTML = '<i>Delete</li>';
        bin.classList.add("bin-button");
        div.appendChild(bin);

        list.appendChild(div);
    });
}

//remove tasks from the storage
function remoteLocalTodos(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    const index = task.children[0].innerText;
    tasks.splice(tasks.indexOf(index), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}