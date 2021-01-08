import { categoryForm, todoItemForm } from './forms';
import Task from './task';
import saveDataToStorage from './local_storage';
import {
  leftPaneComponent, addNewCategoryToList, getCategoryFormValues, innerListItemsUpdater,
} from './left_pane';
import {
  rightPaneComponents, getTasksList, getTaskFormValues,
} from './right_pane';
import { myAlert, myConfirm } from './alert_messages';

const body = document.querySelector('body');

const categories = [];
const allToDos = [];

const CATEGORIES_KEY = 'myCategories';
const TODOS_KEY = 'myToDos';

const leftPaneDiv = document.querySelector('.left-pane-div');
const rightPaneDiv = document.querySelector('.right-pane-div');

leftPaneDiv.innerHTML = leftPaneComponent();
rightPaneDiv.innerHTML = rightPaneComponents();

// Get the already stored tasks and categories from local Storage.

if (localStorage.getItem(TODOS_KEY)) {
  const storedTasks = JSON.parse(localStorage.getItem(TODOS_KEY));
  let holdingTask;
  for (let j = 0; j < storedTasks.length; j += 1) {
    holdingTask = new Task(
      storedTasks[j].taskTitle,
      storedTasks[j].taskDesc,
      storedTasks[j].taskDate,
      storedTasks[j].taskPriority,
      storedTasks[j].taskCat,
    );
    allToDos.push(holdingTask);
  }
}

if (localStorage.getItem(CATEGORIES_KEY)) {
  const storedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));

  for (let i = 0; i < storedCategories.length; i += 1) {
    addNewCategoryToList(storedCategories[i].myName, categories, CATEGORIES_KEY);
  }
} else {
  addNewCategoryToList('Uncategorised', categories, CATEGORIES_KEY);
}

// End of obtaining localStorage Data.

const backToListPage = () => {
  const currentCategory = document.querySelector('.inner-list-items-active');
  let targetArray;
  if (currentCategory === null) {
    getTasksList(allToDos, allToDos);
  } else {
    targetArray = allToDos.filter(
      el => el.getTaskCat().toLowerCase() === currentCategory.textContent.toLowerCase(),
    );
    getTasksList(targetArray, allToDos);
  }
};

const outerListItems = document.querySelectorAll('.outer-list-items > span');
for (let i = 0; i < outerListItems.length; i += 1) {
  outerListItems[i].addEventListener('click', (e) => {
    const updatedOuterListsItems = document.querySelectorAll('.outer-list-items > span');
    for (let j = 0; j < updatedOuterListsItems.length; j += 1) {
      updatedOuterListsItems[j].classList.remove('outer-active');
    }

    e.target.classList.add('outer-active');

    switch (e.target.textContent) {
      case 'All':
        document.querySelector('.inner-item-list').classList.remove('appear');
        document.querySelector('.edit-delete-category-div').style.display = 'none';
        document.querySelector('.no-category-selected').style.display = 'none';
        document.querySelector('.category-heading').textContent = e.target.textContent;
        if (document.querySelector('.selected') != null) {
          document.querySelector('.selected').classList.remove('selected');
        }

        if (document.querySelector('.inner-list-items-active') != null) {
          document.querySelector('.inner-list-items-active').classList.remove('inner-list-items-active');
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

const myDiv = document.createElement('div');
myDiv.classList.add('category-form-div');

body.appendChild(myDiv);


// Method to assist in creating or editing a "Category".

const createOrEditCategory = (formDiv, selectedCategory = null) => {
  if (selectedCategory === null) {
    formDiv.innerHTML = categoryForm();
  } else {
    formDiv.innerHTML = categoryForm(selectedCategory.textContent);
  }

  getCategoryFormValues(selectedCategory, 'category-form', myDiv, categories, CATEGORIES_KEY, allToDos, 'no-category-selected', 'category-heading', 'task-details-section', 'task-heading');

  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
};


// Method to assist in creating or editing a "Task".

const createOrEditTask = (formDiv, currentTaskHeading = null, categoriesArray) => {
  if (currentTaskHeading === null) {
    formDiv.innerHTML = todoItemForm(categoriesArray);
  } else {
    formDiv.innerHTML = todoItemForm(categoriesArray, currentTaskHeading);
  }

  getTaskFormValues(currentTaskHeading, formDiv, 'task-form', allToDos, TODOS_KEY);
  formDiv.style.visibility = 'visible';
  formDiv.style.opacity = 1;
};


// Creating a category

const categoryButton = document.querySelector('.new-category-btn');

categoryButton.addEventListener('click', () => {
  createOrEditCategory(myDiv);
});


// Editing a category

const editCategoryButton = document.querySelector('.edit-category-btn');

editCategoryButton.addEventListener('click', () => {
  const selectedCategory = document.querySelector('.inner-list-items-active');
  createOrEditCategory(myDiv, selectedCategory);
});


// Deleting a category

const deleteCategoryButton = document.querySelector('.delete-category-btn');

deleteCategoryButton.addEventListener('click', () => {
  myConfirm('Are you sure you want to delete this category ?', function(){
    const targetCategoryName = document.querySelector('.inner-list-items-active');
    if (targetCategoryName.textContent !== categories[0].getName()) {
      for (let i = 0; i < allToDos.length; i += 1) {
        if (
          allToDos[i].getTaskCat().toLowerCase()
          === targetCategoryName.textContent.toLowerCase()) {
          allToDos[i].setTaskCat(categories[0].getName());
        }
      }

      for (let j = 0; j < categories.length; j += 1) {
        if (categories[j].getName().toLowerCase()
        === targetCategoryName.textContent.toLowerCase()) {
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
    } else {
      myAlert('YOU ARE NOT ALLOWED TO DELETE THIS CATEGORY!');
    }
  });
});


// Creating a new Task

const createNewTask = document.querySelector('.create-task-btn');

createNewTask.addEventListener('click', () => {
  createOrEditTask(myDiv, null, categories);
});


// Editing a new Task

const editTaskButton = document.querySelector('.edit-task');

editTaskButton.addEventListener('click', () => {
  let currentTaskHeading = document.querySelector('.task-heading');

  for (let i = 0; i < allToDos.length; i += 1) {
    if (currentTaskHeading.textContent === allToDos[i].getTaskTitle()) {
      currentTaskHeading = allToDos[i];
      break;
    }
  }

  createOrEditTask(myDiv, currentTaskHeading, categories);
});

// functionality for the "back button" seen on task details page.

const backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', () => {
  backToListPage();
});

// Deleting a task
const deleteTaskBtn = document.querySelector('.delete-task');

deleteTaskBtn.addEventListener('click', () => {
  myConfirm('Are you sure you want to delete this task?', function(){
    const taskHeading = document.querySelector('.task-heading').textContent;
    for (let i = 0; i < allToDos.length; i += 1) {
      if (allToDos[i].getTaskTitle() === taskHeading) {
        allToDos.splice(i, 1);
        break;
      }
    }
    backToListPage();
  });
});
