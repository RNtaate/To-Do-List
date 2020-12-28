import category from './category';
import categoryForm from './forms';

let body = document.querySelector('body');
let catForm;

let categories = [];
let leftPaneDiv = document.querySelector('.left-pane-div');

leftPaneDiv.innerHTML = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories</span><ul class="inner-item-list"></ul></li></ul><button class="new-category-btn">Create New Category</button>';


let outerListItems = document.querySelectorAll('.outer-list-items > span');

outerListItems[0].addEventListener('click', function() {
  document.querySelector('.inner-item-list').classList.remove('appear');
});

outerListItems[outerListItems.length - 1].addEventListener('click', function() {
  document.querySelector('.inner-item-list').classList.toggle('appear');
}); 

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

