// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const todoItem = createTodoElement(todo.text, todo.checked);
        todoList.appendChild(todoItem);
    });
}

// Create a todo element
function createTodoElement(text, checked = false) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (checked) todoItem.classList.add('checked');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;

    const todoTextNode = document.createElement('span');
    todoTextNode.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';

    // Mark todo as checked
    checkbox.addEventListener('change', () => {
        todoItem.classList.toggle('checked');
        updateLocalStorage();
    });

    // Delete the todo
    deleteButton.addEventListener('click', () => {
        todoItem.remove();
        updateLocalStorage();
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextNode);
    todoItem.appendChild(deleteButton);

    return todoItem;
}

// Update local storage
function updateLocalStorage() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(todoItem => {
        const text = todoItem.querySelector('span').textContent;
        const checked = todoItem.classList.contains('checked');
        todos.push({ text, checked });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
addButton.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        const todoItem = createTodoElement(text);
        todoList.appendChild(todoItem);
        todoInput.value = '';  // Clear input field
        updateLocalStorage();
    }
});

// Load todos when the app is initialized
loadTodos();
