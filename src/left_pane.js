import Category from './category';
import saveDataToStorage from './local_storage';
import {getTasksList, displayTaskDetails} from './right_pane';

let leftPaneComponent = () => {
  let elementString = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><div class="category-btns"><button class="new-category-btn">Create New Category</button><div class="edit-delete-category-div"><button class="edit-category-btn">Edit Category</button><button class="delete-category-btn">Delete Category</button></div></div>';

  return elementString;
}

let addNewCategoryToList = (name, categoriesArray, myKey) => {
  let newCategory = new Category(name);
  categoriesArray.push(newCategory);
  saveDataToStorage(myKey, categoriesArray);
  let newListCategory = document.createElement('li');
  newListCategory.classList.add('inner-list-items');
  newListCategory.textContent = newCategory.getName();
  document.querySelector('.inner-item-list').appendChild(newListCategory);
}

let innerListItemsUpdater = (noCategorySelectedDiv, categoryHeading, fullTaskArray) => {
  let listItems = document.querySelectorAll('.inner-list-items');
  for (let i = 0; i < listItems.length; i += 1) {
    listItems[i].addEventListener('click', function (e) {
      let updatedListItems = document.querySelectorAll('.inner-list-items');
      for (let j = 0; j < updatedListItems.length; j += 1) {
        updatedListItems[j].classList.remove('inner-list-items-active');
      }

      e.target.classList.add('inner-list-items-active');
      document.querySelector('.edit-delete-category-div').style.display = 'flex';
      document.querySelector('.' + noCategorySelectedDiv).style.display = 'none';
      document.querySelector('.' + categoryHeading).textContent = e.target.textContent;

      let targetArray = fullTaskArray.filter(el => el.getTaskCat().toLowerCase() === e.target.textContent.toLowerCase());

      getTasksList(targetArray, fullTaskArray);

    });
  }
}


let getCategoryFormValues = (value = null, formClass, divElement, categoriesArray, myKey, fullTaskArray, noCategorySelectedDiv, categoryHeading, taskDetailsSection, taskHeading) => {
  let catForm = document.querySelector('.' + formClass);

  document.querySelector('.close-form-btn').addEventListener('click', function (e) {
    divElement.style.visibility = 'hidden';
    divElement.style.opacity = '0';
  });

  catForm.addEventListener('submit', function (e) {
    let myName = catForm.elements[0].value;
    if (value === null) {
      addNewCategoryToList(myName, categoriesArray, myKey);
    }
    else {

      for (let i = 0; i < categoriesArray.length; i += 1) {
        if (categoriesArray[i].getName() === value.textContent) {
          categoriesArray[i].setName(catForm.elements[0].value);
          let categoryHead = document.querySelector('.category-heading');
          if (categoryHead.textContent === value.textContent) {
            categoryHead.textContent = catForm.elements[0].value;
          }
          break;
        }
      }
      saveDataToStorage(myKey, categoriesArray);

      for (let j = 0; j < fullTaskArray.length; j += 1) {
        if (fullTaskArray[j].getTaskCat() === value.textContent) {
          fullTaskArray[j].setTaskCat(catForm.elements[0].value);
        }
        console.log('I am being looped');
      }

      if (document.querySelector('.' + taskDetailsSection).style.display != 'none') {
        displayTaskDetails(document.querySelector('.' + taskHeading).textContent, fullTaskArray);
      }
      value.textContent = catForm.elements[0].value;

    }
    catForm.reset();
    divElement.style.visibility = 'hidden';
    divElement.style.opacity = '0';
    innerListItemsUpdater(noCategorySelectedDiv, categoryHeading, fullTaskArray);
    e.preventDefault();
  });
}

export { leftPaneComponent, saveDataToStorage, addNewCategoryToList, getCategoryFormValues, innerListItemsUpdater };