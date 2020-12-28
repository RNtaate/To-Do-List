let categoryForm = (value = '') => {
  let newForm = '<form action="#" method="POST" class="category-form"><input type="text" placeholder="Enter name of category" name="categoryName" required value="' + value + '"><input type="submit"></form>'

  return newForm;
}

export default categoryForm;