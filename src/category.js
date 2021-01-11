class Category {
  constructor(name) {
    this.myName = name;
  }

  getName() {
    return this.myName;
  }

  setName(anotherName) {
    this.myName = anotherName;
  }
}

export default Category;