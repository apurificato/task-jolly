$(document).ready(function() {
    const addTaskForm = $('#addTaskForm');
    const formOutput = $('#toDoCards');
    const formModal = $('#myModal');

    function getTask(e) {
        e.preventDefault();

        const taskTitle = $('#taskTitle', addTaskForm).val();
        const taskDueDate = $('#taskDueDate', addTaskForm).val();
        const taskDescription = $('#taskDescription', addTaskForm).val();

        const formArray = JSON.parse(localStorage.getItem('addTaskForm')) || [];

        const formObj = {
            name: taskTitle,
            date: taskDueDate,
            description: taskDescription
        };

        formArray.push(formObj);

        localStorage.setItem('addTaskForm', JSON.stringify(formArray));

        const modalInstance = bootstrap.Modal.getInstance(formModal[0]);
        modalInstance.hide();

        formModal.on('hidden.bs.modal', function () {
            location.reload();
        });
    }

    function outputTask() {
        const form = JSON.parse(localStorage.getItem('addTaskForm')) || [];

        if (form.length) {
            formOutput.html('');
        }

        $.each(form, function(index, taskObj) {
            formOutput.append(`
                <div class="task row d-flex justify-content-center align-content-center align-center border border-dark py-3 rounded-3" draggable="true" style="background-color: #ffd700; width: 75%">
                    <h3> ${taskObj.name} </h3>
                    <h5> ${taskObj.date} </h5>
                    <p> ${taskObj.description} </p>
                    <button class="delete-btn parentDiv" style="background-color: black; color: white; width: 50%;">Delete Task</button>
                </div>
            `);
        });
    }

    function submit() {
        addTaskForm.off('submit').on('submit', getTask);
    }

    function setupDrop() {
        $('.task, .card-body').droppable({
            accept: '.task',
            drop: function (event, ui) {
                $(this).append(ui.draggable.css({
                    top: "auto",
                    left: "auto"
                }));
            }
        });
    }

    outputTask();
    submit();
    setupDrop();

});
