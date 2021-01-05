let task = (title, description, date, priority, categoryName) => {
  let taskTitle = title;
  let taskDesc = description;
  let taskDate = date;
  let taskPriority = priority;
  let taskCat = categoryName;

  let getTaskTitle = () => {
    return taskTitle;
  }

  let getTaskDesc = () => {
    return taskDesc;
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

  let setTask = (title, description, date, priority, categoryName) => {
    taskTitle = title;
    taskDesc = description;
    taskDate = date;
    taskPriority = priority;
    taskCat = categoryName;
  }

  return { getTaskTitle, getTaskDesc, getTaskCat, setTaskCat, getPriority, getTaskDate, setTask };
}

export default task;