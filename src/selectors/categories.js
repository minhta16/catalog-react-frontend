export const selectCategories = (state) => {
  return Object.values(state.categoriesReducer.categories).slice();
};

export const selectCategory = (state, id) => {
  return state.categoriesReducer.categories[id];
};

export const selectCategoriesLoading = (state) => {
  return state.categoriesReducer.loading;
};
