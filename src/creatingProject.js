import {deleteAndRenameListener} from "./deleteAndRenameProject";
import {id, updateTitle, hideAddTaskForm, displayTask} from "./creatingTask";
import {hideRenameTaskForm, taskEdit} from "./editingTask";
import {checkHomeTile} from "./homeSection";
import {dragAndDropProjectListener} from "./dragAndDropProject";

const PROJECTLISTKEY = "projectListKey";
const TASKLISTID = 'taskListId';

function addNewProject() {
    const newProjectButton = document.querySelector('.add-project-wrapper');
    newProjectButton.addEventListener('click', showAddProject);

    const projectCancelBtn = document.querySelector('.project-cancel-btn');
    projectCancelBtn.addEventListener('click', hideAddProject);

    const addProjectForm = document.querySelector('#AddProjectForm');
    addProjectForm.addEventListener('submit', addProjectName);

    const menu = document.querySelector('#Menu');
    menu.addEventListener('click', menuTilesListener);

    displayProjectList();
}

let defaultProjectList=[];
let projectList = localStorage.getItem(PROJECTLISTKEY);
projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));

function menuTilesListener(e) {
    let homeTile = e.target.closest(".home .tile");
    let projectTile = e.target.closest("#ProjectList .tile");

    if(homeTile!=null) {
        const title = homeTile.querySelector('p').textContent;
        selectTile(homeTile);
        updateTitle(title);
        checkHomeTile(homeTile);
        taskEdit();
    } else if(projectTile!=null) {
        const dataProject = projectTile.dataset.project;
        const title = projectTile.querySelector('p').textContent;
        selectTile(projectTile);
        displayTask(dataProject);
        showAddTaskBtn();
        updateTitle(title);
        taskEdit();
    }
}

function showAddTaskBtn() {
    const addTaskBtn = document.querySelector('.add-task-wrapper')
    addTaskBtn.classList.remove('hidden');
}

function hideAddTaskBtn() {
    const addTaskBtn = document.querySelector('.add-task-wrapper')
    addTaskBtn.classList.add('hidden');
}

function selectTile(tileName) {
    const selectedTile = document.querySelector('.selected');
    if(selectedTile) {
        selectedTile.classList.remove('selected');
    }
    tileName.classList.add('selected');
}

function addProjectName(e) {
    e.preventDefault();
    const projectName = document.querySelector('.project-name-input').value;
    let dataProject = getDataProject();
    const newProject = createProject(dataProject, projectName);
    projectList.push(newProject);
    storeInLocalStorage();
    addToProjectListsUI(dataProject, projectName);
    hideAddProject();
    deleteAndRenameListener();
    dragAndDropProjectListener();
}

function createProject(dataProject, projectName) {
    let taskList = [];
    const taskNum = taskList.length;
    return { dataProject, projectName, taskList, taskNum };
}

function getDataProject() {
    const projects = document.querySelectorAll('[data-project]');
    return projects.length;
}

function addToProjectListsUI(dataProject, projectName) {
    
    //hamburger button Container
    const hamBtn = createNewElement('div', ['ham-btn']);

    // hamburger button
    const bar = createNewElement('div', ['bar']);
    hamBtn.appendChild(bar);

    const projectNameContainer = document.createElement('p');
    projectNameContainer.textContent = projectName;

    const deleteAndRenameContainer = createNewElement('div', ['delete-and-rename']);
    const deleteBtn = createNewElement('i', ['fa-solid', 'fa-trash-can', 'delete-project-btn']);
    const renameBtn = createNewElement('i', ['fa-regular', 'fa-pen-to-square', 'rename-project-btn']);
    deleteAndRenameContainer.appendChild(deleteBtn);
    deleteAndRenameContainer.appendChild(renameBtn);

    const container = createNewElement('div', ['tile'], 'data-project', dataProject);
    container.prepend(hamBtn);
    container.appendChild(projectNameContainer);
    container.appendChild(deleteAndRenameContainer);
    
    const projectWrapper = document.querySelector('#ProjectList');
    projectWrapper.prepend(container);
}

function createNewElement(tag, nameOFClass, attr='', attrValue) {
    const container = document.createElement(tag);
    nameOFClass.forEach(className => {
        container.classList.add(className);
    });
    if(attr!='') {
        container.setAttribute(attr, `${attrValue}`);
    }
    return container;
}

function storeInLocalStorage() {
    localStorage.setItem(PROJECTLISTKEY, JSON.stringify(projectList));
    localStorage.setItem(TASKLISTID, JSON.stringify(id));
}

function displayProjectList() {
    document.querySelector('#ProjectList').innerHTML = '';
    projectList.forEach(project => {
        addToProjectListsUI(project.dataProject,project.projectName);
    });
}

function hideAddProject() {
    const newProject = document.querySelector('#AddProjectForm');
    const projectNameInputField = document.querySelector('.project-name-input');
    projectNameInputField.value = '';
    newProject.classList.add('hidden');
}

function showAddProject() {
    const newProject = document.querySelector('#AddProjectForm');
    newProject.classList.remove('hidden');
    document.querySelector('.project-name-input').focus();
}

export {addNewProject, projectList, storeInLocalStorage, displayProjectList, hideAddTaskBtn}