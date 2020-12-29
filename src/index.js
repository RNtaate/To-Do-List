import category from './category';
import categoryForm from './forms';

let body = document.querySelector('body');
let catForm;

let categories = [];
let leftPaneDiv = document.querySelector('.left-pane-div');

leftPaneDiv.innerHTML = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><button class="new-category-btn">Create New Category</button>';


let outerListItems = document.querySelectorAll('.outer-list-items > span');

for(let i = 0; i < outerListItems.length; i += 1) {
  outerListItems[i].addEventListener('click', function(e){
    console.log(e.target.textContent);
    switch(e.target.textContent) {
      case 'All':
        document.querySelector('.inner-item-list').classList.remove('appear');
        let selectedList = document.querySelector('.selected');
        if(selectedList != null) {
          selectedList.classList.remove('selected'); 
        }
        break;

      case 'Categories':
        document.querySelector('.inner-item-list').classList.toggle('appear');
        e.target.children[0].classList.toggle('selected');
        console.log('Executed the categories section');
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

