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
  return { getTaskTitle, getTaskCat, setTaskCat };
}

export default task;