let todos = [];
let loginForm = document.getElementById("todoForm");
let todoInput = document.getElementById("title");
let todosContainer = document.querySelector(".list-group");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const todoTitle = todoInput.value.trim();

    if (todoTitle !=="") {
        const tache = {
            id: Date.now(),
            title: todoTitle,
            done: false
        };
        todos.push(tache);
        todoInput.value = "";
        updateDisplay();
    }
});

function updateDisplay(){
    todosContainer.innerHTML = null;
    todos.forEach(function(tache){
        addTodoToDom(tache);

 })
}
function addTodoToDom(tache){
    const li = document.createElement("li");
    li.className = "todo list-group-item d-flex align-items-center justify-content-between";
    li.innerHTML = `<div class="form-check">
                        <input class="form-check-input" type="checkbox" id="${tache.id}" ${tache.done ? "checked": ""}>
                        <label class="form-check-label ms-2" for="${tache.id}">
                            ${tache.title}
                        </label>
                    </div>
                    <button class="btn btn-danger btn-sm" aria-label="Supprimer">
                        <i class="bi-trash"></i>
                    </button>`

    const checkBoxInput = li.querySelector("input[type=checkbox]");
    checkBoxInput.addEventListener("click", function(){
        setCheckedTodo(tache.id);
    });
    if(tache.done){
        li.classList.add("opacity-50");
        li.querySelector("label").classList.add("text-decoration-line-through");
    }
    
    const deleteBtn = li.querySelector(".btn-danger");
    deleteBtn.addEventListener("click", function(){
        deleteTodo(tache.id);
    })
    
    todosContainer.prepend(li);
 
}

function setCheckedTodo(id){
    let todo = todos.find(function(todo){
        return todo.id === id;

    });
    if(todo){
        if(todo.done === true) {
            todo.done = false;
        } else {
            todo.done = true;
        }
    } 
    updateDisplay();
}
function deleteTodo(id){
    todos = todos.filter(function(todo){
        return todo.id !== id;

    });
    updateDisplay();
}
