import api from 'utils/apiCalls';
import { CategoriesType } from './types';

export const oldFetchCategories = () => (dispatch) =>
  api.fetchCategories().then((fetchedCategories) =>
    dispatch({
      type: CategoriesType.FETCH_CATEGORIES,
      payload: fetchedCategories,
    }),
  );

export const fetchCategories = () => (dispatch) => {
  dispatch({
    type: CategoriesType.FETCH_CATEGORIES,
    promise: api.fetchCategories(),
  });
};

// export const addCategory = (category, token) => (dispatch) => {
//   createApiCategories(category, token);
//   return dispatch({
//     type: ADD_CATEGORY,
//     payload: category,
//   });
// };
