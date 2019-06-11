export const selectCategories = (state) => {
  let categories = [];
  Object.keys(state.categories).forEach((key) => {
    categories = [...categories, state.categories[key]];
  });
  return categories;
};

export const selectCategory = (state, id) => {
  return state.categories[id];
};
