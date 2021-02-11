import Task from '../src/task';

const myTask = new Task('Laptop Shopping', 'I will shop with Consultant', '2021-01-12', 'High', 'Shopping');

const anotherTask = new Task();

test('Should return the task title', () => {
  expect(myTask.getTaskTitle()).toBe('Laptop Shopping');
  expect(myTask.getTaskTitle()).not.toBeUndefined();
  expect(anotherTask.getTaskTitle()).toBeUndefined();
});

test('Should return the task Description', () => {
  expect(myTask.getTaskDesc()).toBe('I will shop with Consultant');
  expect(myTask.getTaskDesc()).toBeDefined();
  expect(anotherTask.getTaskDesc()).toBeUndefined();
});

test('Should return the task date', () => {
  expect(myTask.getTaskDate()).toBe('2021-01-12');
  expect(myTask.getTaskDate()).not.toBeUndefined();
  expect(anotherTask.getTaskDate()).toBeUndefined();
});

test('Should return the task Category Name', () => {
  expect(myTask.getTaskCat()).toBe('Shopping');
});

test('Should return the task Priority', () => {
  expect(myTask.getPriority()).toBe('High');
  expect(myTask.getPriority()).toBeDefined();
  expect(anotherTask.getPriority()).toBeUndefined();
});

test('Should set an entirely new task', () => {
  expect(myTask.getTaskTitle()).toBe('Laptop Shopping');
  myTask.setTask('Shopping for a house', 'I will meet with agent', '2021-02-02', 'Medium', 'Shopping');
  expect(myTask.getTaskTitle()).toBe('Shopping for a house');
  expect(myTask.getTaskDate()).toBe('2021-02-02');

  myTask.setTask();
  expect(myTask.getTaskTitle()).not.toBe('Shopping for a house');
  expect(myTask.getTaskTitle()).toBeUndefined();
  expect(myTask.getTaskDate()).not.toBe('2021-02-02');
  expect(myTask.getTaskDate()).not.toBeDefined();
});