import api from 'utils/apiCalls';
import { CategoriesType } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategories = () => (dispatch) =>
  api.fetchCategories().then((fetchedCategories) =>
    dispatch({
      type: CategoriesType.FETCH_CATEGORIES,
      payload: fetchedCategories,
    }),
  );

// export const addCategory = (category, token) => (dispatch) => {
//   createApiCategories(category, token);
//   return dispatch({
//     type: ADD_CATEGORY,
//     payload: category,
//   });
// };
