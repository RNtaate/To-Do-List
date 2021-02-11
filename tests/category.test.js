import Category from '../src/category';

test('should return category name', () => {
  const myCategory = new Category('Running');
  const secondCategory = new Category();

  expect(myCategory.getName()).toBe('Running');
  expect(myCategory.getName()).not.toBeUndefined();

  expect(secondCategory.getName()).toBeUndefined();
});

test('should set a category name', () => {
  const anotherCategory = new Category('Shopping');
  const secondCategory = new Category();

  expect(anotherCategory.getName()).toBe('Shopping');
  expect(anotherCategory.setName('Cleaning')).toBeUndefined();
  expect(anotherCategory.getName()).not.toBe('Shopping');
  expect(anotherCategory.getName()).toBe('Cleaning');

  expect(secondCategory.getName()).toBeUndefined();
  expect(secondCategory.setName('Reading')).toBeUndefined();
  expect(secondCategory.getName()).not.toBeUndefined();
  expect(secondCategory.getName()).toBe('Reading');
});