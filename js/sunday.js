function fetchColours(colours){
    let length = colours.length;
    return Math.floor(Math.random() * length);
}

function changeBgColor(){
    const colours = [
        'lightcoral', 'lightgreen', 'lightyellow', 'lightblue', 'lightcyan',
        'lightpink', 'lightsalmon', 'lightseagreen', 'lightgoldenrodyellow',
        'lavender', 'mistyrose', 'honeydew', 'mintcream', 'aliceblue',
        'beige', 'whitesmoke'
    ];

    document.querySelector('body').style.backgroundColor = colours[fetchColours(colours)];
}

setInterval(changeBgColor, 2000);

// sunday To-Do
const todoList = document.querySelector('.sunday-todo-list');
const addButton = document.querySelector('.sunday-todo-button');
const taskInput = document.querySelector('.sunday-task-name');
const timeInput = document.querySelector('.sunday-task-time');
const descriptionInput = document.querySelector('.sunday-task-description');

// Load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('sunday-tasks')) || [];
    tasks.forEach(addTaskToDOM);
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
    localStorage.setItem('sunday-tasks', JSON.stringify(tasks));
};

// Add task to the DOM
const addTaskToDOM = (taskObj) => {
    const li = document.createElement('div');
    li.className = 'todo-item row';
    li.innerHTML = `
        <div class="col-4">
            <h5>Name:</h5>
            <p>${taskObj.name}</p>
        </div>
        <div class="col-4">
            <h5>Timing:</h5>
            <p>${taskObj.time}</p>
        </div>
        <div class="col-4">
            <h5>Description:</h5>
            <p>${taskObj.description}</p>
        </div>
        <div class="col-4">
            <center><button class="sunday-delete-button btn btn-danger">Delete</button></center>
        </div>
    `;
    const deleteButton = li.querySelector('.sunday-delete-button');
    deleteButton.addEventListener('click', () => deleteTask(taskObj, li));
    todoList.appendChild(li);
};

// Add task
const addTask = () => {
    const name = taskInput.value.trim();
    const time = timeInput.value.trim();
    const description = descriptionInput.value.trim();

    if (name && time && description) {
        const taskObj = { name, time, description };
        const tasks = JSON.parse(localStorage.getItem('sunday-tasks')) || [];
        tasks.push(taskObj);
        saveTasks(tasks);
        addTaskToDOM(taskObj);

        // Clear input fields
        taskInput.value = '';
        timeInput.value = '';
        descriptionInput.value = '';
    }
};

// Delete task
const deleteTask = (taskObj, taskElement) => {
    let tasks = JSON.parse(localStorage.getItem('sunday-tasks')) || [];
    tasks = tasks.filter(
        (task) => task.name !== taskObj.name || task.time !== taskObj.time || task.description !== taskObj.description
    );
    saveTasks(tasks);
    todoList.removeChild(taskElement);
};

// Event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
});

// Load tasks on page load
loadTasks();
