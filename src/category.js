const category = (name) => {
  let myName = name;

  const getName = () => {
    return myName;
  }

  const setName = (anotherName) => {
    myName = anotherName;
  }
  
  return{getName, setName};

}

export default category;