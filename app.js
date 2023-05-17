//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const fliterOption = document.querySelector(".filter-todo");

//Event Listeners
//If click on the todoButton, then do the addTodo function
document.addEventListener('DOMContentLoaded',getTodos)

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

fliterOption.addEventListener("change", filterTodo);

//Functions

function addTodo(event) {
    // Prevent from form submitting
    event.preventDefault();

    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add Todo to localstorage
    saveLocalTodos(todoInput.value)

    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv);

    //Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    //Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //Chech Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        // If todo has class completed, delete it; if not, add it.
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        const mStyle = todo.style;
        if (mStyle != undefined && mStyle != null) {
            switch (event.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'none';
                    }
                    else {
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}


// Save the Local Todos
function saveLocalTodos(todo) {
    // Check if there is already a todo.
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // Change to js objects
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    // save the data:localStorage.setItem("key", "value");
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // Change to js objects
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
            // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // Change to js objects
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}