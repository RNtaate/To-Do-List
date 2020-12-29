let task = (title, description, date, priority, categoryName) => {
  let taskTitle = title;
  let taskDesc = description;
  let taskDate = date;
  let taskPriority = priority;
  let taskCat = categoryName;

  let getTask = () => {
    return taskTitle;
  }
  return { getTask };
}

export default task;