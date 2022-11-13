import { projectList, hideAddTaskBtn } from "./creatingProject";
import {addTasktoUI, hideAddTaskForm} from "./creatingTask";

function checkHomeTile(tile) {
    if(tile.id == 'today') {
        showToday();
    } else if(tile.id == 'thisWeek') {
        showThisWeek();
    } else {
        showFavourites();
    }
}

function showToday() {
    hideAddTaskBtn();
    hideAddTaskForm();
    let currentDate = new Date().getDate().toString();
    let currentMonth = (new Date().getMonth()+1).toString();
    let currentYear = new Date().getFullYear().toString();
    let todayDate = currentDate+ "-" + currentMonth+ "-" + currentYear;
    let todayList = [];
    projectList.forEach(project => {
        let list = project.taskList.filter(task => {
            return task.date == todayDate;
        });
        todayList = list.concat(todayList);
    })
    displayHomeTask(todayList);
}

function showThisWeek() {
    hideAddTaskBtn();
    hideAddTaskForm();
    let thisWeekDate = (new Date().getTime()) + (7 * 24 * 60 * 60 * 1000);
    let thisWeekList = [];
    projectList.forEach(project => {
        let list = project.taskList.filter(task => {
            return dateToMs(task.date) <= thisWeekDate;
        });
        thisWeekList = list.concat(thisWeekList);
    })
    displayHomeTask(thisWeekList);
}

function dateToMs(date) {
    let dateArr = date.split('-');
    let temp = dateArr[0];
    dateArr[0] = dateArr[1];
    dateArr[1] = temp;
    return new Date(dateArr.join("-")).getTime();
}

function showFavourites() {
    hideAddTaskBtn();
    hideAddTaskForm();
    let favList = [];
    projectList.forEach(project => {
        let list = project.taskList.filter(task => {
            return task.favorite == true;
        });
        favList = list.concat(favList);
    })
    displayHomeTask(favList);
}

function displayHomeTask(homeList) {
    const taskList = document.querySelector('#Tasks');
    taskList.innerHTML = '';

    homeList.forEach(task=> {
        addTasktoUI(task.taskName, task.description, task.date, task.taskId,task.favorite,task.completed);
    })
}

export{checkHomeTile, showToday};