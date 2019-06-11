export const selectCategories = (state) => {
  let categories = [];
  Object.keys(state).forEach((key) => {
    categories = [...categories, state[key]];
  });
  return categories;
};

export const selectCategory = (state, id) => {
  return state.categories[id];
};
