/**
 * Returns an array of categories in the state
 *
 * @param {object} state current state
 */
export const selectCategories = (state) => {
  return Object.values(state.categoriesReducer.categories).slice();
};

/**
 * Returns an object of a selected category base on the provided id
 *
 * @param {object} state current state
 * @param {string} id category id
 */
export const selectCategory = (state, id) => {
  return state.categoriesReducer.categories[id];
};

/**
 * Returns a boolean which reflects the loading state of categories
 *
 * @param {object} state current state
 */
export const selectCategoriesLoading = (state) => {
  return state.categoriesReducer.loading;
};
