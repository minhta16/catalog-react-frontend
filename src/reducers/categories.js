import { actionNameUtil } from 'middlewares/automate-async-action';
import { CategoriesType } from '../actions/types';

const initialState = {
  categories: {},
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionNameUtil.createRequest(CategoriesType.FETCH_CATEGORIES):
      return { ...state, loading: true };
    case actionNameUtil.createSuccess(CategoriesType.FETCH_CATEGORIES):
      return { ...state, loading: false, categories: action.payload };
    case actionNameUtil.createFailure(CategoriesType.FETCH_CATEGORIES):
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
