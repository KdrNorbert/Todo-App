const localTodos = JSON.parse(localStorage.getItem("todos"))

let todos = [];

const addBtn = document.querySelector('#add-btn');
const addInput = document.querySelector('#add-input');
const listContainer = document.querySelector('.list-container');

if (localTodos) {
    todos.push(...localTodos);
    console.log(localTodos);
    showTodos(todos);
}

function showTodos(list) {
    listContainer.innerHTML = '';

    list.forEach((todo) => {

        const todoContainer = document.createElement('div');
        const todoLeft = document.createElement('div');
        const delBtn = document.createElement('button');
        const checkbox = document.createElement('input');
        const todoText = document.createElement('span');

        todoContainer.classList.add('todo-container');
        todoLeft.classList.add('list-text');
        delBtn.classList.add('del-btn');
        delBtn.setAttribute('id', todo.id);
        todoText.classList.add('todo-text');
        checkbox.setAttribute('type', 'checkbox');

        todoText.innerText = todo.value;
        delBtn.innerText = 'Delete';
        checkbox.checked = todo.isDone;
        if(todo.isDone) {
            todoLeft.classList.add('checked');
        }
        checkbox.addEventListener('input', (() => {
            todo.isDone = !todo.isDone;
            if (checkbox.checked) {
                checkbox.closest('div').classList.add('checked');
            } else {
                checkbox.closest('div').classList.remove('checked')
            }
            localStorage.setItem('todos', JSON.stringify(todos))
        })

        );

        delBtn.addEventListener('click', deleteFn);

        todoLeft.append(checkbox, todoText);
        todoContainer.append(todoLeft, delBtn);
        listContainer.append(todoContainer);
    })
}

function deleteFn({ target: { id } }) {
    todos = todos.filter((todo) => todo.id !== Number(id));
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos(todos);
}


function addNewTodo(text) {
    if (text === '') {
        alert(`Can't add empty todo`);
    }else {
        todos.push({ id: Date.now(), value: text, isDone: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        showTodos(todos);
        addInput.value = '';
    }
    console.log(text);
}


addBtn.addEventListener('click', (() => {
    addNewTodo(addInput.value);
}));


showTodos(todos);