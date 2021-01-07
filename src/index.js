import Category from './category';
import { categoryForm, capitalize, todoItemForm } from './forms';
import Task from './task';
import saveDataToStorage from './local_storage';
import { leftPaneComponent, addNewCategoryToList, getCategoryFormValues, innerListItemsUpdater } from './left_pane';
import { rightPaneComponents, displayTaskDetails, getTasksList, getTaskFormValues } from './right_pane';

let body = document.querySelector('body');
let catForm;

let categories = [];
let allToDos = [];

const CATEGORIES_KEY = 'myCategories';
const TODOS_KEY = 'myToDos';

let leftPaneDiv = document.querySelector('.left-pane-div');
let rightPaneDiv = document.querySelector('.right-pane-div');

leftPaneDiv.innerHTML = leftPaneComponent();
rightPaneDiv.innerHTML = rightPaneComponents();

// Get the already stored tasks and categories from local Storage.

if (localStorage.getItem(TODOS_KEY)) {
  let storedTasks = JSON.parse(localStorage.getItem(TODOS_KEY));
  let holdingTask;
  for (let j = 0; j < storedTasks.length; j += 1) {
    holdingTask = new Task(storedTasks[j].taskTitle, storedTasks[j].taskDesc, storedTasks[j].taskDate, storedTasks[j].taskPriority, storedTasks[j].taskCat);
    allToDos.push(holdingTask);
  }
}

if (localStorage.getItem(CATEGORIES_KEY)) {
  let storedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
  let singleCategory;
  for (let i = 0; i < storedCategories.length; i += 1) {
    addNewCategoryToList(storedCategories[i].myName, categories, CATEGORIES_KEY);
  }
  console.log(categories[0].getName());
}
else {
  addNewCategoryToList('Uncategorised', categories, CATEGORIES_KEY);
}

// End of obtaining localStorage Data.

let backToListPage = () => {
  let currentCategory = document.querySelector('.inner-list-items-active');
  let targetArray;
  if (currentCategory === null) {
    getTasksList(allToDos, allToDos);
  }
  else {
    targetArray = allToDos.filter(el => el.getTaskCat().toLowerCase() === currentCategory.textContent.toLowerCase());
    getTasksList(targetArray, allToDos);
  }
}

let outerListItems = document.querySelectorAll('.outer-list-items > span');
for (let i = 0; i < outerListItems.length; i += 1) {
  outerListItems[i].addEventListener('click', function (e) {

    let updatedOuterListsItems = document.querySelectorAll('.outer-list-items > span');
    for (let j = 0; j < updatedOuterListsItems.length; j += 1) {
      updatedOuterListsItems[j].classList.remove('outer-active');
    }

    e.target.classList.add('outer-active');

    switch (e.target.textContent) {
      case 'All':
        document.querySelector('.inner-item-list').classList.remove('appear');
        let selectedList = document.querySelector('.selected');
        let selectedInnerList = document.querySelector('.inner-list-items-active');
        document.querySelector('.edit-delete-category-div').style.display = 'none';
        document.querySelector('.no-category-selected').style.display = 'none';
        document.querySelector('.category-heading').textContent = e.target.textContent;
        if (selectedList != null) {
          selectedList.classList.remove('selected');
        }

        if (selectedInnerList != null) {
          selectedInnerList.classList.remove('inner-list-items-active');
        }

        getTasksList(allToDos, allToDos);
        break;

      case 'Categories':
        document.querySelector('.inner-item-list').classList.toggle('appear');
        e.target.children[0].classList.toggle('selected');
        innerListItemsUpdater('no-category-selected', 'category-heading', allToDos);
        break;

      default:
    }
  });
}

let myDiv = document.createElement('div');
myDiv.classList.add('category-form-div');

body.appendChild(myDiv);


// Method to assist in creating or editing a "Category".

let createOrEditCategory = (formDiv, selectedCategory = null) => {
  if (selectedCategory === null) {
    formDiv.innerHTML = categoryForm();
  } else {
    formDiv.innerHTML = categoryForm(selectedCategory.textContent);
  }

  getCategoryFormValues(selectedCategory, 'category-form', myDiv, categories, CATEGORIES_KEY, allToDos, 'no-category-selected', 'category-heading', 'task-details-section', 'task-heading' );

  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
}


// Method to assist in creating or editing a "Task".

let createOrEditTask = (formDiv, currentTaskHeading = null, categoriesArray) => {
  if(currentTaskHeading === null) {
    formDiv.innerHTML = todoItemForm(categoriesArray);
  }
  else {
    formDiv.innerHTML = todoItemForm(categoriesArray, currentTaskHeading);
  }
 
  getTaskFormValues(currentTaskHeading, formDiv, 'task-form', allToDos, TODOS_KEY);
  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
}


//Creating a category

let categoryButton = document.querySelector('.new-category-btn');

categoryButton.addEventListener('click', function () {
  createOrEditCategory(myDiv);
});


// Editing a category

let editCategoryButton = document.querySelector('.edit-category-btn');

editCategoryButton.addEventListener('click', function () {
  let selectedCategory = document.querySelector('.inner-list-items-active');
  createOrEditCategory(myDiv, selectedCategory);
});


// Deleting a category

let deleteCategoryButton = document.querySelector('.delete-category-btn');

deleteCategoryButton.addEventListener('click', function () {
  if (confirm('Are you sure you want to delete this category ?')) {
    let targetCategoryName = document.querySelector('.inner-list-items-active');
    if (targetCategoryName.textContent != categories[0].getName()) {

      for (let i = 0; i < allToDos.length; i += 1) {
        if (allToDos[i].getTaskCat().toLowerCase() === targetCategoryName.textContent.toLowerCase()) {
          allToDos[i].setTaskCat(categories[0].getName());
        }
      }

      for (let j = 0; j < categories.length; j += 1) {
        if (categories[j].getName().toLowerCase() === targetCategoryName.textContent.toLowerCase()) {
          categories.splice(j, 1);
          break;
        }
      }
      saveDataToStorage(CATEGORIES_KEY, categories);
      saveDataToStorage(TODOS_KEY, allToDos);

      targetCategoryName.remove();
      document.querySelector('.inner-right-section-div').style.display = 'none';
      document.querySelector('.no-category-selected').style.display = 'block';
      document.querySelector('.task-details-section').style.display = 'none';
      document.querySelector('.right-pane-upper-section').style.display = 'block';
      document.querySelector('.create-task-btn').style.display = 'block';
      innerListItemsUpdater('no-category-selected', 'category-heading', allToDos);
    }
    else {
      alert('YOU ARE NOT ALLOWED TO DELETE THIS CATEGORY!');
    }
  }
});


// Creating a new Task

let createNewTask = document.querySelector('.create-task-btn');

createNewTask.addEventListener('click', function (e) {

  createOrEditTask(myDiv, null, categories)
});


// Editing a new Task

let editTaskButton = document.querySelector('.edit-task');

editTaskButton.addEventListener('click', function (e) {
  let currentTaskHeading = document.querySelector('.task-heading');

  for (let i = 0; i < allToDos.length; i += 1) {
    if (currentTaskHeading.textContent === allToDos[i].getTaskTitle()) {
      currentTaskHeading = allToDos[i];
      break;
    }
  }

  createOrEditTask(myDiv, currentTaskHeading, categories)
});

// functionality for the "back button" seen on task details page.

let backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', function (e) {
  backToListPage();
});

// Deleting a task
let deleteTaskBtn = document.querySelector('.delete-task');

deleteTaskBtn.addEventListener('click', function (e) {
  if (confirm('Are you sure you want to delete this task?')) {
    let taskHeading = document.querySelector('.task-heading').textContent;
    for (let i = 0; i < allToDos.length; i += 1) {
      if (allToDos[i].getTaskTitle() === taskHeading) {
        allToDos.splice(i, 1);
        break;
      }
    }
    backToListPage();
  }
});
