$(document).ready(function() {
    const addTaskForm = $('#addTaskForm');
    const formOutput = $('#toDoCards');
    const formModal = $('#myModal');

    function getTask(e) {
        e.preventDefault();

        const taskTitle = $('#taskTitle').val();
        const taskDueDate = $('#taskDueDate').val();
        const taskDescription = $('#taskDescription').val();

        const formArray = JSON.parse(localStorage.getItem('taskData')) || [];

        const formObj = {
            name: taskTitle,
            date: taskDueDate,
            description: taskDescription
        };

        formArray.push(formObj);

        localStorage.setItem('taskData', JSON.stringify(formArray));

        const modalInstance = bootstrap.Modal.getInstance(formModal[0]);
        modalInstance.hide();

        formModal.on('hidden.bs.modal', function () {
            outputTask();
        });
    }

    function outputTask() {
        const form = JSON.parse(localStorage.getItem('taskData')) || [];

        formOutput.html('');

        form.forEach(taskObj => {
            formOutput.append(`
                <div class="task row d-flex justify-content-center align-content-center align-center border border-dark py-3 rounded-3" draggable="true" style="background-color: #ffd700; width: 75%">
                    <h3> ${taskObj.name} </h3>
                    <h5> ${taskObj.date} </h5>
                    <p> ${taskObj.description} </p>
                    <button class="delete-btn" style="background-color: black; color: white; width: 50%;">Delete Task</button>
                </div>
            `);
        });

        setupDraggable();
    }

    function deleteTask() {
        $(document).on('click', '.delete-btn', function() {
            const taskContainer = $(this).closest('.task');
            const index = taskContainer.index();

            let formArray = JSON.parse(localStorage.getItem('taskData')) || [];
            formArray.splice(index, 1);
            localStorage.setItem('taskData', JSON.stringify(formArray));

            taskContainer.remove();
        });
    }

    function setupDraggable() {
        $('.task').draggable({
            revert: 'invalid',
            helper: 'clone',
            zIndex: 100
        });
    }

    function setupDrop() {
        $('.droppable-container').droppable({
            accept: '.task',
            drop: function(event, ui) {
                const droppedTask = ui.draggable.clone();
                droppedTask.removeClass('ui-draggable-dragging');

                $(this).append(droppedTask);
            }
        });
    }

    addTaskForm.on('submit', getTask);
    deleteTask();
    setupDrop();
    outputTask(); // Initial task output
});
