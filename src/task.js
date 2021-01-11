class Task {
  constructor(title, description, date, priority, categoryName) {
    this.taskTitle = title;
    this.taskDesc = description;
    this.taskDate = date;
    this.taskPriority = priority;
    this.taskCat = categoryName;
  }

  getTaskTitle() {
    return this.taskTitle;
  }

  getTaskDesc() {
    return this.taskDesc;
  }

  getTaskDate() {
    return this.taskDate;
  }

  setTaskCat(catName) {
    this.taskCat = catName;
  }

  getTaskCat() {
    return this.taskCat;
  }

  getPriority() {
    return this.taskPriority;
  }

  setTask(title, description, date, priority, categoryName) {
    this.taskTitle = title;
    this.taskDesc = description;
    this.taskDate = date;
    this.taskPriority = priority;
    this.taskCat = categoryName;
  }
}

export default Task;