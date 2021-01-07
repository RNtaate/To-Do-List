let rightPaneComponents = () => {
  let elementString = '<section class="right-pane-upper-section"><div class="inner-right-section-div"><h2 class="category-heading"></h2><div class="category-tasks-div"><ul class="tasks-list"></ul><p class="note-par"><b>NOTE: </b>red is for high-priority, green is for medium-priority, blue is for low-priority</p></div></div><h2 class="no-category-selected">Select a Category or click "All" on your left to view created tasks here.</h2></section><button class="create-task-btn">Create new Task</button><section class="task-details-section"><button class="back-btn">Back</button><div class="task-details-div"><h2 class="task-heading"></h2><p class="task-description"></p><span class="task-date"></span><span class="task-category-name"></span><span class="task-priority"></span></div><div class="task-details-btns-div"><button class="edit-task">Edit task</button><button class="delete-task">Delete task</button></div></section>'

  return elementString;
}

export default rightPaneComponents;