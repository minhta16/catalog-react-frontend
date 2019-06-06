import { FETCH_CATEGORIES, ADD_CATEGORY } from './types';

export const fetchCategories = () => dispatch => dispatch({
  type: FETCH_CATEGORIES,
});

export const addCategory = category => dispatch => dispatch({
  type: ADD_CATEGORY,
  payload: category,
});
