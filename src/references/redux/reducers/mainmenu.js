import { SELECT_MAIN_MENU_CATEGORY } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_MAIN_MENU_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
