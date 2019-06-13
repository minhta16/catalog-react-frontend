/* eslint-disable no-undef */
import categoriesReducer from '../categories';
import { FETCH_CATEGORIES } from '../../actions/types';

describe('reducer/categories', () => {
  it('should return the initial state', () => {
    expect(categoriesReducer(undefined, {})).toEqual({});
  });

  it('should return the payload with FETCH_CATEGORY', () => {
    const action = {
      type: FETCH_CATEGORIES,
      payload: 'yum',
    };
    expect(categoriesReducer({}, action)).toEqual(action.payload);
  });
});
