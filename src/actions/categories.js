/* eslint-disable import/prefer-default-export */
import api from 'utils/apiCalls';
import { CategoriesType } from './types';

/**
 * dispatch a fetchCategories action whcih fetch all the available categories
 */
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
