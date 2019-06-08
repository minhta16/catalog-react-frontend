import { fetchApiCategories, createApiCategories } from 'references/scripts/apiCalls';
import { FETCH_CATEGORIES, ADD_CATEGORY } from './types';

export const fetchCategories = () => (dispatch) => {
  fetchApiCategories().then((fetchedCategories) => {
    dispatch({
      type: FETCH_CATEGORIES,
      payload: fetchedCategories,
    });
  });
};

export const addCategory = (category, token) => (dispatch) => {
  createApiCategories(category, token);
  dispatch({
    type: ADD_CATEGORY,
    payload: category,
  });
};
