import { projectList, storeInLocalStorage } from "./creatingProject";

function creatingTask() {
    const addTaskBtn = document.querySelector(".add-task-wrapper");
    addTaskBtn.addEventListener("click", showAddTaskForm);

    const addTaskForm = document.querySelector("#addTaskForm");
    addTaskForm.addEventListener("submit", processCreatingTask);

    const formCancelBtn = document.querySelector(".task-cancel-btn");
    formCancelBtn.addEventListener("click", hideAddTaskForm);
}

let id = Number(localStorage.getItem("taskListId")) || 0;

function createTask(
    dataProject,
    taskId,
    taskName,
    description,
    date,
    favorite,
    completed
) {
    return {
        dataProject,
        taskId,
        taskName,
        description,
        date,
        favorite,
        completed,
    };
}

function processCreatingTask(e) {
    e.preventDefault();
    const taskName = document.querySelector("#taskName").value;
    const description = document.querySelector("#desc").value;
    let date = document.querySelector("#date").value;
    date = processDate(date);
    let dataProject = getDataProject();
    const taskListId = id;

    const newTask = createTask(
        dataProject,
        taskListId,
        taskName,
        description,
        date,
        false,
        false
    );
    projectList[dataProject].taskList.push(newTask);
    id++;
    storeInLocalStorage();
    addTasktoUI(taskName, description, date, taskListId);
    hideAddTaskForm();
}

function displayTask(dataProject) {
    const taskList = document.querySelector('#Tasks');
    taskList.innerHTML = '';

    projectList[dataProject].taskList.forEach(task=> {
        addTasktoUI(task.taskName, task.description, task.date, task.taskId,task.favorite,task.completed);
    })
}

function addTasktoUI(taskName, description, date, taskListId, favorite, completed) {
    const taskContainer = newElement('div', `${taskListId}`, 'taskInfo');
    const taskTitle = newElement('div','taskTitle');

    const checkBoxlabel = newElement('label', '', 'completeLabel');
    checkBoxlabel.htmlFor = `checkComplete${taskListId}`;

    const checkBox = newElement('input', `checkComplete${taskListId}`);
    checkBox.type = 'checkbox';
    checkBoxlabel.appendChild(checkBox);

    // checkBoxlabel.innerHTML = `<input id="checkComplete${taskListId}" type="checkbox" />`;
    const taskNameContainer = newElement('p', '', 'taskName');
    taskNameContainer.textContent = taskName;

    const taskBtns = newElement('div', '', 'task-buttons');

    const dateContainer = newElement('span', '', 'task-date');
    dateContainer.innerText = date;

    const favBtn = newElement('i', '', 'fa-regular fa-star fav-btn');
    const deleteBtn = newElement('i', '', 'fa-solid fa-trash-can delete-task-btn')
    const renameBtn = newElement('i', '', 'fa-regular fa-pen-to-square rename-task-btn');

    const descContainer = newElement('div', 'description');
    const desc = newElement('p',);
    desc.textContent = description;
    descContainer.appendChild(desc);
    
    if(completed) {
        checkBox.checked = true;
        taskContainer.classList.add('strike-through', 'dim');
    }
    if(favorite) {
        favBtn.classList.remove('fa-regular');
        favBtn.classList.add('fa-solid');
    }

    taskBtns.appendChild(dateContainer);
    taskBtns.appendChild(favBtn);
    taskBtns.appendChild(deleteBtn);
    taskBtns.appendChild(renameBtn);

    taskTitle.appendChild(checkBoxlabel);
    taskTitle.appendChild(taskNameContainer);
    taskTitle.appendChild(taskBtns);
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(descContainer);

    
    document.querySelector("#Tasks").append(taskContainer);
}

function newElement(tagName, id, className) {
    const element = document.createElement(tagName);
    if(id) element.id = id;
    if(className) {
        className = className.split(' ');
        className.forEach(name => {
            element.classList.add(name);
        })
    
    }
    return element;
}

function processDate(date) {
    if (!date) {
        return (date = "No due date");
    }
    return date.split("-").reverse().join("-");
}

function updateTitle(name) {
    const title = document.querySelector('.project-title h1');
    title.textContent = name;
}

function getDataProject() {
    let selectedProjectTile = document.querySelector(".selected");
    return selectedProjectTile.dataset.project;
}

function showAddTaskForm() {
    const addTaskForm = document.querySelector("#addTaskForm");
    addTaskForm.classList.remove("hidden");
    const taskName = document.querySelector("#taskName");
    taskName.focus();
}

function hideAddTaskForm() {
    const addTaskForm = document.querySelector("#addTaskForm");
    addTaskForm.classList.add("hidden");
    addTaskForm.reset();
}

export { creatingTask, id, updateTitle, hideAddTaskForm, displayTask, processDate, addTasktoUI };
