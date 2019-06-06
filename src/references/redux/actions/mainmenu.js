import { SELECT_MAIN_MENU_CATEGORY } from './types';

export const selectMainMenuCategory = category => dispatch => dispatch({
  type: SELECT_MAIN_MENU_CATEGORY,
  payload: category,
});
