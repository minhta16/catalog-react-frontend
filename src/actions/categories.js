import { fetchApiCategories } from 'utils/apiCalls';
import { FETCH_CATEGORIES } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategories = () => (dispatch) =>
  fetchApiCategories().then((fetchedCategories) =>
    dispatch({
      type: FETCH_CATEGORIES,
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
