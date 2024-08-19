// Cache elements using selectElementById
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const markAllButton = document.getElementById('markAllButton');

// Function to create a new task item
function createTask(taskContent) {
    const taskTemplate = document.createElement('li');
    taskTemplate.className = 'task-item';
    taskTemplate.innerHTML = `
        <span class="task-content">${taskContent}</span>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    const completeBtn = taskTemplate.querySelector('.complete-btn');
    const deleteBtn = taskTemplate.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => {
        taskTemplate.classList.toggle('completed');
        saveTasks();
    });

    deleteBtn.addEventListener('click', () => {
        taskTemplate.remove();
        saveTasks();
    });

    taskList.appendChild(taskTemplate);
}

// Function to add a task
function addTask(event) {
    event.preventDefault();
    const taskContent = taskInput.value.trim();
    if (taskContent) {
        createTask(taskContent);
        taskInput.value = '';
        saveTasks();
    }
}

// Function to mark all tasks as completed
function markAllCompleted() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => task.classList.add('completed'));
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item')).map(task => ({
        content: task.querySelector('.task-content').textContent,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (task.completed) taskItem.classList.add('completed');
        taskItem.innerHTML = `
            <span class="task-content">${task.content}</span>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
    });
}

// Function to filter tasks
function filterTasks(status) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (status === 'all' || (status === 'completed' && isCompleted) || (status === 'pending' && !isCompleted)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Add filter buttons
function addFilterButtons() {
    const allButton = document.createElement('button');
    allButton.textContent = 'Show All';
    allButton.addEventListener('click', () => filterTasks('all'));
    
    const completedButton = document.createElement('button');
    completedButton.textContent = 'Show Completed';
    completedButton.addEventListener('click', () => filterTasks('completed'));

    const pendingButton = document.createElement('button');
    pendingButton.textContent = 'Show Pending';
    pendingButton.addEventListener('click', () => filterTasks('pending'));

    document.body.insertBefore(allButton, taskForm);
    document.body.insertBefore(completedButton, taskForm);
    document.body.insertBefore(pendingButton, taskForm);
}

// Event listeners
taskForm.addEventListener('submit', addTask);
markAllButton.addEventListener('click', markAllCompleted);

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    addFilterButtons();
});

// Example of BOM properties/methods usage
console.log('Window width:', window.innerWidth);
alert('Welcome to the To-Do List Manager!');

