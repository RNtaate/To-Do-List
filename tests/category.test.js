import Category from "../src/category";

test.only('should return category name', () => {
  let myCategory = new Category('Running');
  expect(myCategory.getName()).toBe('Running');
});

test('should set a category name', () => {
  let anotherCategory = new Category('Shopping');
  expect(anotherCategory.getName()).toBe('Shopping');
  expect(anotherCategory.setName('Cleaning')).toBeUndefined;
  expect(anotherCategory.getName()).toBe('Cleaning');
});