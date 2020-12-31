let task = (title, description, date, priority, categoryName) => {
  let taskTitle = title;
  let taskDesc = description;
  let taskDate = date;
  let taskPriority = priority;
  let taskCat = categoryName;

  let getTaskTitle = () => {
    return taskTitle;
  }

  let getTaskDate = () => {
    return taskDate;
  }

  let setTaskCat = (catName) => {
    taskCat = catName;
  }

  let getTaskCat = () => {
    return taskCat;
  }

  let getPriority = () => {
    return taskPriority;
  } 
  return { getTaskTitle, getTaskCat, setTaskCat, getPriority, getTaskDate };
}

export default task;