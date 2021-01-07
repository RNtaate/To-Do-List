import Category from './category';

let leftPaneComponent = () => {
  let elementString = '<ul><li class="outer-list-items"><span>All</span></li><li class="outer-list-items category-list"><span>Categories<i class="fa fa-caret-down"></i></span><ul class="inner-item-list"></ul></li></ul><div class="category-btns"><button class="new-category-btn">Create New Category</button><div class="edit-delete-category-div"><button class="edit-category-btn">Edit Category</button><button class="delete-category-btn">Delete Category</button></div></div>';

  return elementString;
}

let saveDataToStorage = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
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


export { leftPaneComponent, saveDataToStorage, addNewCategoryToList };