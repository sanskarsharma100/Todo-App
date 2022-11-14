import {projectList, storeInLocalStorage, displayProjectList} from "./creatingProject"
import {rearrangeDataProject} from "./deleteAndRenameProject"

let dragStartIndex;

function dragAndDropProjectListener() {
    const dragBtns = document.querySelectorAll("#ProjectList .ham-btn");
    const draggableTiles = document.querySelectorAll("#ProjectList .tile");

    dragBtns.forEach((drag) => {
        ['mousedown','dragstart'].forEach(evt => 
            drag.addEventListener(evt, dragStart)
        );
    });

    draggableTiles.forEach((tile) => {
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
    });
}

function dragStart(e) {
    this.parentNode.draggable = true;
    console.log("Event: ", "dragstart");
    dragStartIndex = +this.closest('.tile').getAttribute('data-project');
    console.log("dragStartIndex: ", dragStartIndex);
}

function dragEnter() {
    console.log("Event: ", "dragenter");
}

function dragLeave() {
    console.log("Event: ", "dragleave");
}

function dragOver(e) {
    e.preventDefault();
    console.log("Event: ", "dragover");
    console.log('dragStartIndex', dragStartIndex);
}

function dragDrop() {
    console.log("Event: ", "drop");
    const dragEndIndex = +this.getAttribute('data-project');
    console.log('dragEndIndex',dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(startIndex, endIndex) {
    const startItem = document.querySelector(`[data-project="${startIndex}"]`);
    const endItem = document.querySelector(`[data-project="${endIndex}"]`);
    const projectContainer = document.querySelector('#ProjectList');
    let nextStartIndex = startIndex-1;
    if(nextStartIndex==endIndex) {
        projectContainer.insertBefore(endItem,startItem);
    } else {
        const nextStartItem = document.querySelector(`[data-project="${nextStartIndex}"]`);
        projectContainer.insertBefore(startItem, endItem);
        projectContainer.insertBefore(endItem, nextStartItem);
    }

    const temp = projectList[endIndex];
    projectList[endIndex] = projectList[startIndex];
    projectList[startIndex] = temp;

    rearrangeDataProject();
    storeInLocalStorage();
}

export { dragAndDropProjectListener };
