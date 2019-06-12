export const loadCurrentUser = () => {
  try {
    const serializedState = localStorage.getItem('currentUser');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveCurrentUser = (user) => {
  try {
    const serializedState = JSON.stringify(user);
    localStorage.setItem('currentUser', serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const loadCategories = () => {
  try {
    const serializedState = localStorage.getItem('categories');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveCategories = (categories) => {
  try {
    const serializedState = JSON.stringify(categories);
    localStorage.setItem('categories', serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const loadState = () => {
  return {
    currentUser: loadCurrentUser(),
    categories: loadCategories(),
  };
};
