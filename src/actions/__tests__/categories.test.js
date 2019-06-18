/* eslint-disable no-undef */
import api from 'utils/apiCalls';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCategories } from '../categories';
import { CategoriesType } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('utils/apiCalls');

describe('actions/categories', () => {
  const store = mockStore({});

  it('should create FETCH_CATEGORIES when done fetching', async () => {
    store.dispatch(fetchCategories());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: CategoriesType.FETCH_CATEGORIES,
      promise: api.fetchCategories(),
    });
  });
});
