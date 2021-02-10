import Task from '../src/task';

let myTask = new Task('Laptop Shopping', "I will shop with Consultant", "2021-01-12", "High", "Shopping")

test("Should return the task title", () => {
  expect(myTask.getTaskTitle()).toBe('Laptop Shopping');
});

test("Should return the task Description", () => {
  expect(myTask.getTaskDesc()).toBe('I will shop with Consultant');
});

test("Should return the task date", () => {
  expect(myTask.getTaskDate()).toBe('2021-01-12');
});

test("Should return the task Category Name", () => {
  expect(myTask.getTaskCat()).toBe('Shopping');
});

test("Should return the task Priority", () => {
  expect(myTask.getPriority()).toBe('High');
});

test('Should set an entirely new task', () => {
  expect(myTask.getTaskTitle()).toBe('Laptop Shopping');
  myTask.setTask("Shopping for a house", "I will meet with agent", "2021-02-02", "Medium", "Shopping")
  expect(myTask.getTaskTitle()).toBe('Shopping for a house');
  expect(myTask.getTaskDate()).toBe('2021-02-02');
});