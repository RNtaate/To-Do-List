import category from './category';
import {categoryForm, capitalize, todoItemForm} from './forms';
import task from './task';

let body = document.querySelector('body');
let catForm;

let categories = [];
let allToDos = [];

let leftPaneDiv = document.querySelector('.left-pane-div');
let rightPaneDiv = document.querySelector('.right-pane-div');


leftPaneDiv.innerHTML = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><div class="category-btns"><button class="new-category-btn">Create New Category</button><div class="edit-delete-category-div"><button class="edit-category-btn">Edit Category</button><button class="delete-category-btn">Delete Category</button></div></div>';

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

      value.textContent = catForm.elements[0].value;

    }
    catForm.reset();
    document.querySelector('.category-form-div').style.visibility = 'hidden';
    document.querySelector('.category-form-div').style.opacity = '0';
    innerListItemsUpdater();
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

rightPaneDiv.innerHTML = '<section class="right-pane-upper-section"><h2 class="category-heading"></h2><div class="category-tasks-div"><ul></ul></div><h2 class="no-category-selected">Select a Category or click "All" on your left to view created tasks here.</h2></section><button class="create-task-btn">Create new Task</button>'