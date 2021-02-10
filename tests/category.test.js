import Category from '../src/category';

test('should return category name', () => {
  const myCategory = new Category('Running');
  expect(myCategory.getName()).toBe('Running');
});

test.only('should set a category name', () => {
  const anotherCategory = new Category('Shopping');
  expect(anotherCategory.getName()).toBe('Shopping');
  expect(anotherCategory.setName('Cleaning')).toBeUndefined();
  expect(anotherCategory.getName()).toBe('Cleaning');
});