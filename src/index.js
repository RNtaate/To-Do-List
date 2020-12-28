import category from './category';
import categoryForm from './forms';

let body = document.querySelector('body');
let catForm;

let categories = [];
let leftPaneDiv = document.querySelector('.left-pane-div');

leftPaneDiv.innerHTML = '<ul><li>All</li><li class="category-list">Categories<ul class="inner-item-list"></ul></li></ul><button class="new-category-btn">Create New Category</button>';


let categoryButton = document.querySelector('.new-category-btn');
console.log(categoryButton.textContent);


let myDiv = document.createElement('div');
myDiv.classList.add('category-form-div');

body.appendChild(myDiv);

let addNewCategoryToList = (name) => {
  let newCategory = category(name);
  categories.push(newCategory);
  let newListCategory = document.createElement('li');
  newListCategory.textContent = newCategory.getName();
  document.querySelector('.inner-item-list').appendChild(newListCategory);
}

let getCategoryFormValues = () => {
  catForm = document.querySelector('.category-form');

  catForm.addEventListener('submit', function(e) {
    let myName = catForm.elements[0].value;
    addNewCategoryToList(myName);
    catForm.reset();
    document.querySelector('.category-form-div').style.display = 'none';
    e.preventDefault();
  });
}

categoryButton.addEventListener('click', function(){
  let formDiv = document.querySelector('.category-form-div');
  formDiv.innerHTML = categoryForm();
  getCategoryFormValues();
  formDiv.style.display = 'block';
});

