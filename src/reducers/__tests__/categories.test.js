/* eslint-disable no-undef */
import { actionNameUtil } from 'middlewares/automate-async-action';
import categoriesReducer from '../categories';
import { CategoriesType } from '../../actions/types';

describe('reducer/categories', () => {
  it('should return the initial state', () => {
    expect(categoriesReducer(undefined, {})).toEqual({ categories: {}, loading: false, error: {} });
  });

  it('should return loading with FETCH_CATEGORY_REQUEST', () => {
    const action = {
      type: actionNameUtil.createRequest(CategoriesType.FETCH_CATEGORIES),
    };
    expect(categoriesReducer({}, action)).toEqual({ loading: true });
  });

  it('should return the payload with FETCH_CATEGORY_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createSuccess(CategoriesType.FETCH_CATEGORIES),
      payload: 'yum',
    };
    expect(categoriesReducer({}, action)).toEqual({ loading: false, categories: 'yum' });
  });

  it('should return the error with FETCH_CATEGORY_FAILURE', () => {
    const action = {
      type: actionNameUtil.createFailure(CategoriesType.FETCH_CATEGORIES),
      payload: 'yum',
    };
    expect(categoriesReducer({}, action)).toEqual({ loading: false, error: 'yum' });
  });
});
