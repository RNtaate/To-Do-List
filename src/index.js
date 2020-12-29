import category from './category';
import categoryForm from './forms';

let body = document.querySelector('body');
let catForm;

let categories = [];
let allToDos = [];

let leftPaneDiv = document.querySelector('.left-pane-div');

leftPaneDiv.innerHTML = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><button class="new-category-btn">Create New Category</button>';

let innerListItemsUpdater = () => {
  let listItems = document.querySelectorAll('.inner-list-items');
  for(let i = 0; i < listItems.length; i += 1) {
    listItems[i].addEventListener('click', function(e) {
      let updatedListItems = document.querySelectorAll('.inner-list-items');
      for(let j = 0; j < updatedListItems.length; j += 1) {
        updatedListItems[j].classList.remove('inner-list-items-active');
      }

      e.target.classList.add('inner-list-items-active');
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

let getCategoryFormValues = () => {
  catForm = document.querySelector('.category-form');

  document.querySelector('.close-form-btn').addEventListener('click', function(e) {
    document.querySelector('.category-form-div').style.visibility = 'hidden';
    document.querySelector('.category-form-div').style.opacity = '0';
  });

  catForm.addEventListener('submit', function (e) {
    let myName = catForm.elements[0].value;
    addNewCategoryToList(myName);
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

