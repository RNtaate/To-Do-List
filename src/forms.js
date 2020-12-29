let capitalize = (word) => {
  let myWord = "" + word;
  myWord = myWord.toLowerCase();
  let firstLetter = myWord.slice(0, 1);
  myWord = firstLetter.toUpperCase() + myWord.slice(1);

  return myWord
}

let categoryForm = (value = '') => {
  let newForm = '<form action="#" method="POST" class="category-form"><span class="close-form-btn">&times;</span><input type="text" placeholder="Enter name of category" name="categoryName" required value="' + value + '"><input type="submit"></form>';

  return newForm;
}

let todoItemForm = (arr) => {

  let mySelectDiv= document.createElement('div');
  let select = document.createElement('select');
  select.setAttribute('id', 'todoCategories');
  for(let i = 0; i < arr.length; i += 1) {
    let op = document.createElement('option');
    op.setAttribute('value', arr[i].getName());
    op.textContent = capitalize(arr[i].getName());
    select.appendChild(op);
  }
  myDiv.appendChild(select);

  let selectHolder = mySelectDiv.innerHTML + '';

  let todoForm = '<form action="#" method="POST" class="category-form"><input type="text" placeholder="Enter Task title" required><textarea placeholder="Describe your task here" rows="5"></textarea><label>Task due date : </label><input type="date" placeholder="Give it a due date" required><label>Task Priority: </label><span><input type="checkbox" value="high"> High</span><span><input type="checkbox" value="medium"> Medium</span><span><input type="checkbox" value="low" checked> Low</span>' + selectHolder + '</form>'

  return todoForm;
}

export {categoryForm, capitalize, todoItemForm};