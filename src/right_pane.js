import Task from './task';
import saveDataToStorage from './local_storage';

let rightPaneComponents = () => {
  let elementString = '<section class="right-pane-upper-section"><div class="inner-right-section-div"><h2 class="category-heading"></h2><div class="category-tasks-div"><ul class="tasks-list"></ul><p class="note-par"><b>NOTE: </b>red is for high-priority, green is for medium-priority, blue is for low-priority</p></div></div><h2 class="no-category-selected">Select a Category or click "All" on your left to view created tasks here.</h2></section><button class="create-task-btn">Create new Task</button><section class="task-details-section"><button class="back-btn">Back</button><div class="task-details-div"><h2 class="task-heading"></h2><p class="task-description"></p><span class="task-date"></span><span class="task-category-name"></span><span class="task-priority"></span></div><div class="task-details-btns-div"><button class="edit-task">Edit task</button><button class="delete-task">Delete task</button></div></section>'

  return elementString;
}

let displayTaskInformation = (headingName, arr) => {

  let targetTask = arr.filter(obj => obj.getTaskTitle().toLowerCase() === headingName.toLowerCase());

  targetTask = targetTask[0];

  let lowerSection = document.querySelector('.task-details-section');
  lowerSection.style.display = 'flex';

  let taskHeading = document.querySelector('.task-heading');
  taskHeading.textContent = targetTask.getTaskTitle();

  let taskDesc = document.querySelector('.task-description');
  taskDesc.textContent = targetTask.getTaskDesc();

  let taskDate = document.querySelector('.task-date');
  taskDate.textContent = "Due Date: " + targetTask.getTaskDate();

  let taskPriority = document.querySelector('.task-priority');
  taskPriority.textContent = "Priority: " + targetTask.getPriority();

  let taskCat = document.querySelector('.task-category-name');
  taskCat.textContent = "Category Name: " + targetTask.getTaskCat();
}

let displayTaskDetails = (heading, arr) => {
  let upperSection = document.querySelector('.right-pane-upper-section');
  upperSection.style.display = 'none';
  let createNewTaskBtn = document.querySelector('.create-task-btn');
  createNewTaskBtn.style.display = 'none';

  displayTaskInformation(heading, arr);
}

let getTasksList = (taskArray = null, fullTaskArray) => {
  let lowerSection = document.querySelector('.task-details-section');
  lowerSection.style.display = 'none';

  let upperSection = document.querySelector('.right-pane-upper-section');
  upperSection.style.display = 'block';
  let createNewTaskBtn = document.querySelector('.create-task-btn');
  createNewTaskBtn.style.display = 'block';

  let myTaskList = document.querySelector('.tasks-list')
  myTaskList.innerHTML = "";

  let displayDiv = document.querySelector('.inner-right-section-div');

  for (let i = 0; i < taskArray.length; i += 1) {
    let taskItem = document.createElement('li');
    taskItem.classList.add('task-list-item');
    taskItem.classList.add(taskArray[i].getPriority());
    taskItem.setAttribute('title', 'Click to view task details');
    taskItem.addEventListener('click', function (e) {
      displayTaskDetails(this.children[0].textContent, fullTaskArray);
    });

    let taskHeading = document.createElement('h3');
    taskHeading.textContent = taskArray[i].getTaskTitle();

    let taskDueDate = document.createElement('span');
    taskDueDate.textContent = "Due Date: " + taskArray[i].getTaskDate();

    taskItem.appendChild(taskHeading);
    taskItem.appendChild(taskDueDate);

    myTaskList.appendChild(taskItem);
  }
  displayDiv.style.display = 'block';
}



let getTaskFormValues = (currentTask = null, divElement, taskFormClass, fullTaskArray, myKey) => {
  document.querySelector('.close-form-btn').addEventListener('click', function (e) {
    divElement.style.visibility = 'hidden';
    divElement.style.opacity = '0';
  });

  let taskForm = document.querySelector('.' + taskFormClass);
  taskForm.addEventListener('submit', function (e) {
    let taskTitle;
    let taskDesc;
    let taskDate;
    let taskPriority;
    let taskCatName;

    for (let i = 0; i < taskForm.elements.length; i += 1) {
      switch (taskForm.elements[i].id) {
        case 'task-title':
          let myArray = fullTaskArray.filter(el => el.getTaskTitle().toLowerCase() === taskForm.elements[i].value.toLowerCase());

          if (myArray.length > 0) {
            divElement.style.visibility = 'hidden';
            divElement.style.opacity = '0';
            e.preventDefault();
            if (currentTask === null) {
              return alert('Task with that title is already taken, please enter a different task title');
            }
          }
          taskTitle = taskForm.elements[i].value;
          break;
        case 'task-desc':
          taskDesc = taskForm.elements[i].value;
        case 'task-date':
          taskDate = taskForm.elements[i].value;
        case 'high':
          if (taskForm.elements[i].checked) {
            taskPriority = taskForm.elements[i].value
          }
          break;
        case 'medium':
          if (taskForm.elements[i].checked) {
            taskPriority = taskForm.elements[i].value
          }
          break;
        case 'low':
          if (taskForm.elements[i].checked) {
            taskPriority = taskForm.elements[i].value
          }
          break;
        case 'todoCategories':
          taskCatName = taskForm.elements[i].value;
        default:
      }
    }

    if (currentTask === null) {
      let newTask = new Task(taskTitle, taskDesc, taskDate, taskPriority, taskCatName);
      fullTaskArray.push(newTask);
      saveDataToStorage(myKey, fullTaskArray);

      let showingDiv = document.querySelector('.no-category-selected');

      if (showingDiv.style.display === 'none') {
        let clickedCategory = document.querySelector('.inner-list-items-active');
        if (clickedCategory == null) {
          getTasksList(fullTaskArray, fullTaskArray);
        }
        else {
          let targetArray = allToDos.filter(el => el.getTaskCat().toLowerCase() == clickedCategory.textContent.toLowerCase());
          getTasksList(targetArray, fullTaskArray);
        }
      }
    }
    else {
      currentTask.setTask(taskTitle, taskDesc, taskDate, taskPriority, taskCatName);
      saveDataToStorage(myKey, fullTaskArray);
      displayTaskDetails(taskTitle, fullTaskArray);
    }

    divElement.style.visibility = 'hidden';
    divElement.style.opacity = '0';
    e.preventDefault();
  });
}


export { rightPaneComponents, displayTaskDetails, getTasksList, getTaskFormValues };