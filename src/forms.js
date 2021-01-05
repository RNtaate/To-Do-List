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

let todoItemForm = (arr, existingTask = '') => {

  let title, desc, date, high, medium, low, categoryName;
  title = desc = date = high = medium = categoryName = '';

  if(existingTask != '') {
    title = existingTask.getTaskTitle();
    desc = existingTask.getTaskDesc();
    date = existingTask.getTaskDate().replace(/[/]/g, '-');
    categoryName = existingTask.getTaskCat();
    switch(existingTask.getPriority()) {
      case 'high':
        high = 'checked';
        break;
      case 'medium':
        medium = 'checked';
        break;
      case 'low':
        low = 'checked';
        break;
      default:
    }
  }
  else {
    low = 'checked';
  }

  let mySelectDiv= document.createElement('div');
  let select = document.createElement('select');
  select.setAttribute('id', 'todoCategories');
  // if(existingTask != '') {
  //   select.setAttribute('value', existingTask.getTaskCat());
  // }
  for(let i = 0; i < arr.length; i += 1) {
    let op = document.createElement('option');
    op.setAttribute('value', arr[i].getName());
    if(categoryName === arr[i].getName()) {
      op.setAttribute('selected', 'selected');
    }
    op.textContent = capitalize(arr[i].getName());
    select.appendChild(op);
  }
  mySelectDiv.appendChild(select);

  let selectHolder = mySelectDiv.innerHTML + '';

  let todoForm = '<form action="#" method="POST" class="category-form task-form"><span class="close-form-btn">&times;</span><input type="text" placeholder="Enter Task title" id="task-title" required value="' + title + '"><textarea placeholder="Describe your task here" rows="5" id="task-desc" required>' + desc + '</textarea><label>Task due date : </label><input type="date" placeholder="Give it a due date" id="task-date" required value="' + date + '"><label>Task Priority: </label><span><input type="radio" name="priority" id="high" value="high" ' + high + '> High</span><span><input type="radio" name="priority" id="medium" value="medium" ' + medium + '> Medium</span><span><input type="radio" name="priority" id="low" value="low" ' + low + '> Low</span><br><label>Category: </label>' + selectHolder + '<input type="submit"></form>'

  return todoForm;
}

export {categoryForm, capitalize, todoItemForm};