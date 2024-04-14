// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
    const taskCard = `
    <section class="task-card p-5" data-id="${task.id}">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due Date: ${task.dueDate}</p>
        <button class="delete-btn">Delete</button>
    </section>
    `;
    return taskCard;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    // const todoColumn = document.getElementById('to-do');
    // todoColumn.innerHTML = ''; // Clear existing tasks

    taskList.forEach(function (task) {
        const taskCard = createTaskCard(task);
        // todoColumn.insertAdjacentHTML('beforeend', taskCard);
        $('#to-do').append(taskCard);
    });

    // Make cards draggable
    $('.task-card').draggable({
        containment: '.container',
        // revert: 'invalid',
        revert: true,
        cursor: 'move',
        stack: '.task-card'
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskDescription = document.getElementById('taskDescription').value;

    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription
    };

    taskList.push(newTask);
    // saveTasksToLocalStorage();
    // renderTaskList();
    // Update localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList))
    localStorage.setItem("nextId", JSON.stringify(nextId))

    // Render the updated task list by creating the task card
    const taskCard = createTaskCard(newTask)
    $("#to-do").append(taskCard) 

    // Clear the forms
    $("#Tasktitle").val("")
    $("#taskDescription").val("")
    $("#taskDueDate").val("")

    // Reset form
    document.getElementById('taskForm').reset();

    // Close modal
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.hide();
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = parseInt(event.target.parentNode.dataset.id);
    taskList = taskList.filter(task => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = parseInt(ui.draggable[0].dataset.id);
    const task = taskList.find(task => task.id === taskId);
    const newStatus = event.target.dataset.status;

    // Update task status
    task.status = newStatus;
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    $('#submitBtn').click(function () {
        console.log("submit button clicked")
        $('formModal').modal("hide")
    })

    renderTaskList();

    $('#taskDueDate').datepicker();

    $('#addTaskBtn').click(handleAddTask);

    $(document).on('click', '.delete-btn', handleDeleteTask);

    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });
});
