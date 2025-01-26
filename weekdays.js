function fetchColours(colours){
    let length = colours.length;
    return Math.floor(Math.random()*length);
}

function changeBgColor(){
    const colours = ['red', 'green', 'yellow', 'blue', 'aquamarine', 'teal', 'magenta', 'voilet', 'orangered', 'maroon', 'golden', 'silver', 'orange', 'darkgreen', 'darkblue'];
    document.querySelector('body').style.backgroundColor = colours[fetchColours(colours)];
}

setInterval(changeBgColor, 2000);



// Function to add a task
function addTask(day) {
    const taskName = document.querySelector(`.task-name-${day}`).value;
    const taskTime = document.querySelector(`.task-time-${day}`).value;
    const taskDescription = document.querySelector(`.task-description-${day}`).value;

    if (taskName && taskTime && taskDescription) {
        const task = {
            name: taskName,
            time: taskTime,
            description: taskDescription
        };

        // Save task to localStorage
        let tasks = JSON.parse(localStorage.getItem(day)) || [];
        tasks.push(task);
        localStorage.setItem(day, JSON.stringify(tasks));

        // Clear the input fields
        document.querySelector(`.task-name-${day}`).value = '';
        document.querySelector(`.task-time-${day}`).value = '';
        document.querySelector(`.task-description-${day}`).value = '';

        // Display tasks
        displayTasks(day);
    }
}

// Function to display tasks
function displayTasks(day) {
    const taskList = document.querySelector(`.todo-list-${day}`);
    const tasks = JSON.parse(localStorage.getItem(day)) || [];

    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        // taskElement.classList.add('task');
        taskElement.className = 'todo-item row';
        taskElement.innerHTML = `
            <div class="col-3">
                <h5>Name:</h5>
                <p>${task.name}</p>
            </div>
            <div class="col-3">
                <h5>Timing:</h5>
                <p>${task.time}</p>
            </div>
            <div class="col-3">
                <h5>Description:</h5>
                <p>${task.description}</p>
            </div>
            <div class="col-3">
                <center>
                    <button class="btn btn-danger" onclick="removeTask(${index}, '${day}')">Delete<button>
                </center>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

// Function to remove a task
function removeTask(index, day) {
    let tasks = JSON.parse(localStorage.getItem(day)) || [];
    tasks.splice(index, 1);
    localStorage.setItem(day, JSON.stringify(tasks));

    // Update the task list after removal
    displayTasks(day);
}

// Display tasks on page load
window.onload = function() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        displayTasks(day);
    });
};
