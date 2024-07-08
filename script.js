const signinBtn = document.getElementById('signin-btn');
const todoList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

let tasks = [];

signinBtn.addEventListener('click', () => {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    if (username === 'admin' && password === 'password') {
        signinBtn.textContent = 'Signed In';
        signinBtn.disabled = true;
        loadTasks();
    } else {
        alert('Invalid username or password');
    }
});

addTaskBtn.addEventListener('click', () => {
    const newTask = newTaskInput.value.trim();
    if (newTask) {
        tasks.push({ text: newTask, completed: false });
        newTaskInput.value = '';
        renderTasks();
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        const taskIndex = tasks.findIndex((task) => task.text === e.target.nextElementSibling.textContent);
        tasks[taskIndex].completed = e.target.checked;
        renderTasks();
    } else if (e.target.tagName === 'LI') {
        const taskIndex = tasks.findIndex((task) => task.text === e.target.textContent);
        tasks.splice(taskIndex, 1);
        renderTasks();
    } else if (e.target.tagName === 'BUTTON' && e.target.classList.contains('delete-btn')) {
        const taskIndex = tasks.findIndex((task) => task.text === e.target.previousElementSibling.textContent);
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
});

function loadTasks() {
    // Load tasks from local storage or a database
    tasks = [
        { text: 'Buy milk', completed: false },
        { text: 'Walk the dog', completed: true },
        { text: 'Do laundry', completed: false },
    ];
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li>
                <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
                <label for="task-${index}">${task.text}</label>
                <button class="delete-btn">X</button>
            </li>
        `;
        todoList.innerHTML += taskHTML;
    });
}