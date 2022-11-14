import { projectList, storeInLocalStorage } from "./creatingProject";
import {processDate} from "./creatingTask";

function taskEdit() {
    const taskLists = document.querySelector('#Tasks');
    taskLists.addEventListener('click', processBtnActions);
}

function processBtnActions(e) {
    const checkBox = e.target.closest("#taskTitle input[type='checkbox']");
    const favBtn = e.target.closest('#taskTitle .fav-btn');
    const deleteBtn = e.target.closest('#taskTitle .delete-task-btn');
    const renameBtn = e.target.closest('#taskTitle .rename-task-btn');
    const descExpand = e.target.closest('.taskInfo .arrow-btn');
    
    
    if(checkBox) {
        checkCompleted(checkBox);
    } else if(favBtn) {
        checkFavourite(favBtn);
    } else if(deleteBtn) {
        checkDelete(deleteBtn);
    } else if(renameBtn) {
        checkRename(renameBtn);
    } else if(descExpand) {
        console.log('descExpand', descExpand);
        checkDescExpand(descExpand);
    }
}

function checkCompleted(checkBox) {
    const taskInfo = checkBox.parentNode.parentNode.parentNode;
    if(checkBox.checked) {
        taskInfo.classList.add('strike-through', 'dim');
    } else {
        taskInfo.classList.remove('strike-through', 'dim');
    }
    const task = findTask(taskInfo.id);
    task.completed = !task.completed;
    storeInLocalStorage();
}

function checkFavourite(favBtn) {
    const taskInfo = favBtn.parentNode.parentNode.parentNode;
    const task = findTask(taskInfo.id);
    if(task.favorite) {
        favBtn.classList.remove('fa-solid');
        favBtn.classList.add('fa-regular');
    } else {
        favBtn.classList.remove('fa-regular');
        favBtn.classList.add('fa-solid');
    }
    task.favorite = !task.favorite;
    storeInLocalStorage();
}

function findTask(id) {
    let taskName=0;
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            if(task.taskId == id) {
                taskName = task;
            }
        })
    })
    return taskName;
}

function checkDelete(deleteBtn) {
    const taskInfo = deleteBtn.parentNode.parentNode.parentNode;
    let details = getTaskDetails(taskInfo.id);
    let projectName = details[0];
    let taskName = details[1];
    projectName.taskList = arrayRemove(projectName.taskList, taskName);
    taskInfo.remove();
    storeInLocalStorage();
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function getTaskDetails(id) {
    let projectName;
    let taskName;
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            if(task.taskId == id) {
                projectName = project
                taskName = task;
            }
        })
    })
    return [projectName, taskName];
}

function checkRename(renameBtn) {
    const taskInfo = renameBtn.parentNode.parentNode.parentNode;
    
    const taskForm = document.querySelector('#addTaskForm');
    const renameForm = taskForm.cloneNode(true);
    renameForm.id = 'renameTaskForm';
    const addBtn = renameForm.querySelector('.task-add-btn');
    addBtn.value = 'Save';

    const taskName = taskInfo.querySelector('#taskTitle p');
    const desc = taskInfo.querySelector('#description p');
    const date = taskInfo.querySelector('#taskTitle .task-date');

    const taskNameInput = renameForm.querySelector("input[type='text']");
    const descInput = renameForm.querySelector('textarea');
    const dateInput = renameForm.querySelector("input[type='date']")

    taskNameInput.value = taskName.textContent;
    descInput.value = desc.textContent;
    dateInput.value = processDate(date.textContent);

    renameForm.classList.remove('hidden');
    const tasks = taskInfo.parentNode;
    tasks.insertBefore(renameForm, taskInfo);
    taskInfo.classList.add('hidden');
    taskRenameFormBtnListener(renameForm,taskInfo);
}

function taskRenameFormBtnListener(renameForm, taskInfo) {
    renameForm.addEventListener('submit', processTaskRename);
    const cancelBtn = renameForm.querySelector('.task-cancel-btn');
    cancelBtn.addEventListener('click', e => {
        hideRenameTaskForm();
        taskInfo.classList.remove('hidden');
    });
}

function processTaskRename(e) {
    e.preventDefault();
    const selectedTask = findHiddenTask();
    
    const taskName = selectedTask.querySelector('#taskTitle p');
    const desc = selectedTask.querySelector('#description p');
    const date = selectedTask.querySelector('#taskTitle .task-date');

    const taskNameInput = e.target.querySelector("input[type='text']");
    const descInput = e.target.querySelector('textarea');
    const dateInput = e.target.querySelector("input[type='date']");

    taskName.textContent = taskNameInput.value;
    desc.textContent = descInput.value;
    date.textContent = processDate(dateInput.value);

    const task = findTask(selectedTask.id);
    task.taskName = taskName.textContent;
    task.description = desc.textContent;
    task.date = date.textContent;
    storeInLocalStorage();

    selectedTask.classList.remove('hidden');
    hideRenameTaskForm();
}

function checkDescExpand(descExpand) {
    console.log("sibling",descExpand.previousSibling);
    const desc = descExpand.previousSibling;
    const arrow = descExpand.firstChild;
    console.log('transform', arrow.computedStyleMap().get('transform')[0].angle.value);
    if(arrow.computedStyleMap().get('transform')[0].angle.value == 45) {
        arrow.style.transform = 'rotate(-135deg)'
    } else {
        arrow.style.transform = 'rotate(45deg)'
    }
    if(desc.textContent) {
        desc.classList.toggle('expanded-desc');
    }
}

function findHiddenTask() {
    return document.querySelector('#Tasks .taskInfo.hidden');
}

function hideRenameTaskForm() {
    const addTaskForm = document.querySelector("#renameTaskForm");
    addTaskForm.remove();
}

export{taskEdit, hideRenameTaskForm}