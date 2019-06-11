/* eslint-disable no-undef */
import { responseItems } from 'references/scripts/__mocks__/apiCalls';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchPosts } from '../posts';
import { FETCH_POSTS } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('references/scripts/apiCalls');

describe('actions/posts', () => {
  const store = mockStore({});

  it('should create FETCH_POSTS when done fetching', () => {
    store.dispatch(fetchPosts()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: FETCH_POSTS,
        payload: responseItems,
      });
    });
  });
});
