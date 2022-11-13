import {addNewProject} from "./creatingProject";
import {deleteAndRenameListener} from "./deleteAndRenameProject";
import {creatingTask} from "./creatingTask";
import {taskEdit} from "./editingTask";
import {showToday} from "./homeSection";
import {dragAndDropProjectListener} from "./dragAndDropProject";

addNewProject();
deleteAndRenameListener();
creatingTask();
taskEdit();
showToday();
dragAndDropProjectListener();