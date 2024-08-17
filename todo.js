document.addEventListener('DOMContentLoaded', function () {
    const addListBtn = document.getElementById('add-list-btn');
    const popup = document.getElementById('popup');
    const saveTaskBtn = document.getElementById('save-task-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const todoTextarea = document.getElementById('todo-textarea');
    const todoList = document.getElementById('todo-list');

    let editMode = false;
    let currentTask = null;

    // Load saved tasks from localStorage on page load
    loadTasks();

    addListBtn.addEventListener('click', function () {
        popup.classList.remove('hidden');
        todoTextarea.focus();
        editMode = false;
        todoTextarea.value = ""; 
    });

    saveTaskBtn.addEventListener('click', function () {
        const taskText = todoTextarea.value.trim();
        if (taskText !== "") {
            if (editMode) {
                currentTask.querySelector('.task-text').textContent = taskText;
                saveTasks(); // Save changes to localStorage
            } else {
                const li = document.createElement('li');

                const span = document.createElement('span');
                span.className = 'task-text';
                span.textContent = taskText;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'actions';

                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', () => editTask(li));

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => deleteTask(li));

                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);

                li.appendChild(span);
                li.appendChild(actionsDiv);

                todoList.appendChild(li);
                saveTasks(); // Save new task to localStorage
            }
            popup.classList.add('hidden');
        }
    });

    // Hide the popup without saving when "Cancel" is clicked
    cancelBtn.addEventListener('click', function () {
        popup.classList.add('hidden');
    });

    // Optional: Hide the popup if the user clicks outside the popup content
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });

    function editTask(taskElement) {
        editMode = true;
        currentTask = taskElement;
        todoTextarea.value = taskElement.querySelector('.task-text').textContent;
        popup.classList.remove('hidden');
        todoTextarea.focus();
    }

    function deleteTask(taskElement) {
        taskElement.remove();
        saveTasks(); // Update localStorage after deletion
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(task => {
            tasks.push(task.querySelector('.task-text').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(taskText => {
                const li = document.createElement('li');

                const span = document.createElement('span');
                span.className = 'task-text';
                span.textContent = taskText;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'actions';

                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', () => editTask(li));

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => deleteTask(li));

                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);

                li.appendChild(span);
                li.appendChild(actionsDiv);

                todoList.appendChild(li);
            });
        }
    }
});
