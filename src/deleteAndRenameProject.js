import {projectList, storeInLocalStorage} from "./creatingProject";
import { updateTitle } from "./creatingTask";
import {showToday} from "./homeSection";
import {dragAndDropProjectListener} from "./dragAndDropProject";

function deleteAndRenameListener() {
    const deleteBtns = document.querySelectorAll('.delete-project-btn');
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteProject);
    });
    const renameBtns = document.querySelectorAll('.rename-project-btn');
    renameBtns.forEach(renameBtn => {
        renameBtn.addEventListener('click', showRenameProjectForm);
    });
    const formRename = document.querySelector('#RenameForm');
    formRename.addEventListener('submit', renameProject)
    const formCancelBtn = document.querySelector('#RenameForm .project-cancel-btn');
    formCancelBtn.addEventListener('click', () => {
        setOriginalRenameFormPos();
        hideRenameForm();
        showRenamedProject();
    })
}

function deleteProject(e) {
    const dataProjectToBeDeleted = e.target.parentNode.parentNode.dataset.project;
    projectList.splice(dataProjectToBeDeleted,1);
    deleteProjectListContent(dataProjectToBeDeleted);
    rearrangeDataProject();
    storeInLocalStorage();
}

function rearrangeDataProject() {
    let i=projectList.length-1;
    const projectTiles = document.querySelectorAll('#ProjectList .tile');
    
    projectTiles.forEach((tile) => {
        tile.dataset.project = i;
        projectList[i].dataProject = i;
        i--;
    });
    projectList.sort((a,b) => a.dataProject - b.dataProject);
}

function deleteProjectListContent(dataProjectValue) {
    const container = document.querySelector(`[data-project="${dataProjectValue}"]`);
    const today = document.querySelector('#today');
    container.remove();
    today.classList.add('selected');
    showToday();
}

function renameProject(e) {
    e.preventDefault();
    const projectName = document.querySelector('#ProjectList .tile.hidden p');
    const newName = document.querySelector('#RenameForm .project-name-input');
    projectName.textContent = newName.value;
    const dataProject = projectName.parentNode.dataset.project;
    projectList[dataProject].projectName = newName.value;
    storeInLocalStorage();
    setOriginalRenameFormPos();
    hideRenameForm();
    showRenamedProject();
    updateTitle(newName.value);
    dragAndDropProjectListener();
}

function showRenameProjectForm(e) {
    const projectNode = e.target.parentNode.parentNode;
    
    if(!isRenameFormHidden()) {
        setOriginalRenameFormPos();
        showRenamedProject();
    } 
    changeRenameFormPos(projectNode);
    showRenameForm();
}

function isRenameFormHidden() {
    const renameForm = document.querySelector('#RenameForm');
    return renameForm.classList.contains('hidden');
}

function changeRenameFormPos(projectNode) {
    const projectListNode = projectNode.parentNode;
    projectNode.classList.add('hidden');
    const renameForm = document.querySelector('#RenameForm');
    const projectNameContainer = projectNode.querySelector('p');
    renameForm.querySelector('input').value = projectNameContainer.textContent;
    projectListNode.insertBefore(renameForm, projectNode);
}

function hideRenameForm() {
    const renameForm = document.querySelector('#RenameForm');
    renameForm.classList.add('hidden');
}

function showRenameForm() {
    const renameForm = document.querySelector('#RenameForm');
    renameForm.classList.remove('hidden');
    renameForm.querySelector('input').focus();
}

function showRenamedProject() {
    const hiddenProjectTile = document.querySelector('#ProjectList .tile.hidden')
    hiddenProjectTile.classList.remove('hidden');
}

function setOriginalRenameFormPos() {
    const renameForm = document.querySelector('#RenameForm');
    const projectList = document.querySelector('#ProjectList');
    projectList.appendChild(renameForm);
}

export {deleteAndRenameListener, rearrangeDataProject};