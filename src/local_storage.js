let saveDataToStorage = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
}

export default saveDataToStorage;