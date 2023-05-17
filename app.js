//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const fliterOption = document.querySelector(".filter-todo");

//Event Listeners
//If click on the todoButton, then do the addTodo function
document.addEventListener('DOMContentLoaded', getTodos)

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

fliterOption.addEventListener("change", filterTodo);

//Functions

// Create todo div

function addDiv(textInput) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = textInput;
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
}

function addTodo(event) {
    // Prevent from form submitting
    event.preventDefault();
    addDiv(todoInput.value)
    //Add Todo to localstorage
    saveLocalTodos(todoInput.value)
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
        // remove from local storage
        if (todo.classList.value === "todo fall") {
            removeLocalTodos(todo);
        }else{
            removecptTodos(todo);
        }
       
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //Chech Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        // Save completed items into local storage
        if (item.parentElement.classList.value === "todo") {
            saveCompleted(todo.childNodes[0].innerText);
            removeLocalTodos(todo);
            // saveLocalTodos(todo.childNodes[0].innerText);
        } else {
            removecptTodos(todo);
            saveLocalTodos(todo.childNodes[0].innerText);
        }

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


// Save the Local Completed Todos
function saveCompleted(cpt) {
    let cpts;
    if (localStorage.getItem('cpts') === null) {
        cpts = [];
    } else {
        // Change to js objects
        cpts = JSON.parse(localStorage.getItem('cpts'))
    }

    cpts.push(cpt);
    // save the data:localStorage.setItem("key", "value");
    localStorage.setItem('cpts', JSON.stringify(cpts));

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

    let cpts;
    if (localStorage.getItem('cpts') === null) {
        cpts = [];
    } else {
        // Change to js objects
        cpts = JSON.parse(localStorage.getItem('cpts'));
    }

    // get uncompleted todos
    todos.forEach(function (todo) {
        addDiv(todo)
    });

    // get completed todos
    cpts.forEach(function (cpt) {
        // Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo","completed");

        //Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = cpt;
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


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // Change to js objects
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove from the Completed Todos
function removecptTodos(cpt) {
    let cpts;
    if (localStorage.getItem('cpts') === null) {
        cpts = [];
    } else {
        // Change to js objects
        cpts = JSON.parse(localStorage.getItem('cpts'));
    }

    const cptIndex = cpt.children[0].innerText;
    cpts.splice(cpts.indexOf(cptIndex), 1);
    localStorage.setItem('cpts', JSON.stringify(cpts));
}