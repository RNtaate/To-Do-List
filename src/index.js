import category from './category';
import {categoryForm, capitalize, todoItemForm} from './forms';
import task from './task';

let body = document.querySelector('body');
let catForm;

let categories = [];
let allToDos = [];

let leftPaneDiv = document.querySelector('.left-pane-div');
let rightPaneDiv = document.querySelector('.right-pane-div');


let dummyTask = task('Dummy Task', 'This is a dummy task', '2020/12/30', 'high', 'Uncategorised');
let readingTask = task('Reading Task', 'This is a dummy task', '2020/12/30', 'low', 'Reading');
allToDos.push(dummyTask);
allToDos.push(readingTask);


leftPaneDiv.innerHTML = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><div class="category-btns"><button class="new-category-btn">Create New Category</button><div class="edit-delete-category-div"><button class="edit-category-btn">Edit Category</button><button class="delete-category-btn">Delete Category</button></div></div>';

let displayTaskInformation = (headingName) => {

  let targetTask = allToDos.filter(obj => obj.getTaskTitle().toLowerCase() === headingName.toLowerCase());

  targetTask = targetTask[0];

  let lowerSection = document.querySelector('.task-details-section');
  lowerSection.style.display = 'block';

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

let displayTaskDetails = (heading) => {
  let upperSection = document.querySelector('.right-pane-upper-section');
  upperSection.style.display = 'none';
  let createNewTaskBtn = document.querySelector('.create-task-btn');
  createNewTaskBtn.style.display = 'none';

  displayTaskInformation(heading);
}

let getTasksList = (taskArray = null) => {
  let lowerSection = document.querySelector('.task-details-section');
  lowerSection.style.display = 'none';

  let upperSection = document.querySelector('.right-pane-upper-section');
  upperSection.style.display = 'block';
  let createNewTaskBtn = document.querySelector('.create-task-btn');
  createNewTaskBtn.style.display = 'block';

  let myTaskList = document.querySelector('.tasks-list')
  myTaskList.innerHTML = "";

  let displayDiv = document.querySelector('.inner-right-section-div');

  for(let i = 0; i < taskArray.length; i += 1) {
    let taskItem = document.createElement('li');
    taskItem.classList.add('task-list-item');
    taskItem.classList.add(taskArray[i].getPriority());
    taskItem.setAttribute('title', 'Click to view task details');
    taskItem.addEventListener('click', function(e) {
      displayTaskDetails(this.children[0].textContent);
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

let backToListPage = () => {
  let currentCategory = document.querySelector('.inner-list-items-active');
  let targetArray;
  if (currentCategory === null) {
   getTasksList(allToDos);
  }
  else {
    targetArray = allToDos.filter(el => el.getTaskCat().toLowerCase() === currentCategory.textContent.toLowerCase());
    getTasksList(targetArray);
  }
}

let innerListItemsUpdater = () => {
  let listItems = document.querySelectorAll('.inner-list-items');
  for(let i = 0; i < listItems.length; i += 1) {
    listItems[i].addEventListener('click', function(e) {
      let updatedListItems = document.querySelectorAll('.inner-list-items');
      for(let j = 0; j < updatedListItems.length; j += 1) {
        updatedListItems[j].classList.remove('inner-list-items-active');
      }

      e.target.classList.add('inner-list-items-active');
      document.querySelector('.edit-delete-category-div').style.display = 'flex';
      document.querySelector('.no-category-selected').style.display = 'none';
      document.querySelector('.category-heading').textContent = e.target.textContent;

      let targetArray = allToDos.filter(el => el.getTaskCat().toLowerCase() === e.target.textContent.toLowerCase());

      getTasksList(targetArray);
  
    });
  }
}


let outerListItems = document.querySelectorAll('.outer-list-items > span');
for(let i = 0; i < outerListItems.length; i += 1) {
  outerListItems[i].addEventListener('click', function(e){

    let updatedOuterListsItems = document.querySelectorAll('.outer-list-items > span');
    for(let j = 0; j < updatedOuterListsItems.length; j += 1) {
      updatedOuterListsItems[j].classList.remove('outer-active');
    }  

    e.target.classList.add('outer-active');

    switch(e.target.textContent) {
      case 'All':
        document.querySelector('.inner-item-list').classList.remove('appear');
        let selectedList = document.querySelector('.selected');
        let selectedInnerList = document.querySelector('.inner-list-items-active');
        document.querySelector('.edit-delete-category-div').style.display = 'none';
        document.querySelector('.no-category-selected').style.display = 'none';
        document.querySelector('.category-heading').textContent = e.target.textContent;
        if(selectedList != null) {
          selectedList.classList.remove('selected'); 
        }

        if(selectedInnerList != null) {
          selectedInnerList.classList.remove('inner-list-items-active');           
        }

        getTasksList(allToDos);
        break;

      case 'Categories':
        document.querySelector('.inner-item-list').classList.toggle('appear');
        e.target.children[0].classList.toggle('selected');
        innerListItemsUpdater();
        break;

      default:
    }
  });
}

let categoryButton = document.querySelector('.new-category-btn');
console.log(categoryButton.textContent);


let myDiv = document.createElement('div');
myDiv.classList.add('category-form-div');

body.appendChild(myDiv);

let addNewCategoryToList = (name) => {
  let newCategory = category(name);
  categories.push(newCategory);
  let newListCategory = document.createElement('li');
  newListCategory.classList.add('inner-list-items');
  newListCategory.textContent = newCategory.getName();
  document.querySelector('.inner-item-list').appendChild(newListCategory);
}

addNewCategoryToList('Uncategorised');
addNewCategoryToList('Reading');

let getCategoryFormValues = (value = null) => {
  catForm = document.querySelector('.category-form');

  document.querySelector('.close-form-btn').addEventListener('click', function(e) {
    document.querySelector('.category-form-div').style.visibility = 'hidden';
    document.querySelector('.category-form-div').style.opacity = '0';
  });

  catForm.addEventListener('submit', function (e) {
    let myName = catForm.elements[0].value;
    if(value === null){
      addNewCategoryToList(myName);
    }
    else {

      for(let i = 0; i < categories.length; i += 1) {
        if(categories[i].getName() === value.textContent) {
          categories[i].setName(catForm.elements[0].value);
          let categoryHeading = document.querySelector('.category-heading');
          if(categoryHeading.textContent === value.textContent) {
            categoryHeading.textContent = catForm.elements[0].value;
          }
          break;
        }
      }

      for(let j = 0; j < allToDos.length; j += 1) {
        if(allToDos[j].getTaskCat() === value.textContent){
          allToDos[j].setTaskCat(catForm.elements[0].value);
        }
      }

      value.textContent = catForm.elements[0].value;

    }
    catForm.reset();
    document.querySelector('.category-form-div').style.visibility = 'hidden';
    document.querySelector('.category-form-div').style.opacity = '0';
    innerListItemsUpdater();
    e.preventDefault();
  });
}

let getTaskFormValues = (currentTask = null) => {
  document.querySelector('.close-form-btn').addEventListener('click', function(e) {
    document.querySelector('.category-form-div').style.visibility = 'hidden';
    document.querySelector('.category-form-div').style.opacity = '0';
  });

  let taskForm = document.querySelector('.task-form');
  taskForm.addEventListener('submit', function(e){
    let taskTitle;
    let taskDesc;
    let taskDate;
    let taskPriority;
    let taskCatName;
    console.log(taskForm.elements.length);
    for(let i = 0; i < taskForm.elements.length; i += 1) {
      switch(taskForm.elements[i].id){
        case 'task-title':
          let myArray = allToDos.filter(el => el.getTaskTitle().toLowerCase() === taskForm.elements[i].value.toLowerCase());
          console.log(myArray.length);
          if(myArray.length > 0) {
            document.querySelector('.category-form-div').style.visibility = 'hidden';
            document.querySelector('.category-form-div').style.opacity = '0';
            e.preventDefault();
            if(currentTask === null) {
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
          if(taskForm.elements[i].checked) {
            taskPriority = taskForm.elements[i].value
          }
          break;
        case 'medium':
          if(taskForm.elements[i].checked) {
            taskPriority = taskForm.elements[i].value
          }
          break;          
        case 'low':
          if(taskForm.elements[i].checked) {
            taskPriority = taskForm.elements[i].value
          }
          break;          
        case 'todoCategories':
          taskCatName = taskForm.elements[i].value;
        default:
      }
    }

    if(currentTask === null) {
      let newTask = task(taskTitle, taskDesc, taskDate, taskPriority, taskCatName);
      allToDos.push(newTask);

      let showingDiv = document.querySelector('.no-category-selected');

      if(showingDiv.style.display === 'none') {
        let clickedCategory = document.querySelector('.inner-list-items-active');
        if(clickedCategory == null) {
          getTasksList(allToDos);
        }
        else{
          let targetArray = allToDos.filter(el => el.getTaskCat().toLowerCase() == clickedCategory.textContent.toLowerCase());
          getTasksList(targetArray);
        } 
      }
    }
    else{
      currentTask.setTask(taskTitle, taskDesc, taskDate, taskPriority, taskCatName);
      displayTaskDetails(taskTitle);
    }

    document.querySelector('.category-form-div').style.visibility = 'hidden';
    document.querySelector('.category-form-div').style.opacity = '0';
    e.preventDefault();
  });
}

categoryButton.addEventListener('click', function () {
  let formDiv = document.querySelector('.category-form-div');
  formDiv.innerHTML = categoryForm();
  getCategoryFormValues();
  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
});

let editCategoryButton = document.querySelector('.edit-category-btn');

editCategoryButton.addEventListener('click', function() {

  let selectedCategory  = document.querySelector('.inner-list-items-active');
  let formDiv = document.querySelector('.category-form-div');
  formDiv.innerHTML = categoryForm(selectedCategory.textContent);

  getCategoryFormValues(selectedCategory);

  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
});


//Right Pane Main Code

rightPaneDiv.innerHTML = '<section class="right-pane-upper-section"><div class="inner-right-section-div"><h2 class="category-heading"></h2><div class="category-tasks-div"><ul class="tasks-list"></ul><p class="note-par"><b>NOTE: </b>red is for high-priority, green is for medium-priority, blue is for low-priority</p></div></div><h2 class="no-category-selected">Select a Category or click "All" on your left to view created tasks here.</h2></section><button class="create-task-btn">Create new Task</button><section class="task-details-section"><button class="back-btn">Back</button><div class="task-details-div"><h2 class="task-heading"></h2><p class="task-description"></p><span class="task-date"></span><span class="task-category-name"></span><span class="task-priority"></span></div><div class="task-details-btns-div"><button class="edit-task">Edit task</button><button class="delete-task">Delete task</button></div></section>'

let createNewTask = document.querySelector('.create-task-btn');

createNewTask.addEventListener('click', function(e) {
  let formDiv = document.querySelector('.category-form-div');
  formDiv.innerHTML = todoItemForm(categories);
  getTaskFormValues();
  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
});

let backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', function(e) {
  backToListPage();
});


let deleteTaskBtn = document.querySelector('.delete-task');

deleteTaskBtn.addEventListener('click', function(e) {
  if(confirm('Are you sure you want to delete this task?')) {
    let taskHeading = document.querySelector('.task-heading').textContent;
    for(let i = 0; i < allToDos.length; i += 1) {
      if(allToDos[i].getTaskTitle() === taskHeading) {
        allToDos.splice(i, 1);
        break;
      }
    }
    backToListPage();
  }
});

let editTaskButton = document.querySelector('.edit-task');

editTaskButton.addEventListener('click', function(e) {
  let currentTaskHeading = document.querySelector('.task-heading');

  for(let i = 0; i < allToDos.length; i += 1) {
    if(currentTaskHeading.textContent === allToDos[i].getTaskTitle()) {
      currentTaskHeading = allToDos[i];
      break;
    }
  }

  let formDiv = document.querySelector('.category-form-div');
  formDiv.innerHTML = todoItemForm(categories, currentTaskHeading);
  getTaskFormValues(currentTaskHeading);
  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
});
