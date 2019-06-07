import { fetchApiCategories } from 'references/scripts/apiCalls';
import { FETCH_CATEGORIES, ADD_CATEGORY } from './types';

export const fetchCategories = () => (dispatch) => {
  const categories = fetchApiCategories();
  dispatch({
    type: FETCH_CATEGORIES,
    payload: categories,
  });
};

export const addCategory = category => dispatch => dispatch({
  type: ADD_CATEGORY,
  payload: category,
});
