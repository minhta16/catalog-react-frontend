/* eslint-disable no-undef */
import { responseCat } from 'references/scripts/__mocks__/apiCalls';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCategories } from '../categories';
import { FETCH_CATEGORIES } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('references/scripts/apiCalls');

describe('actions/categories', () => {
  const store = mockStore({});

  it('should create FETCH_CATEGORIES when done fetching', async () => {
    await store.dispatch(fetchCategories()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: FETCH_CATEGORIES,
        payload: responseCat,
      });
    });
  });
});
