import { CategoriesType } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CategoriesType.FETCH_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
