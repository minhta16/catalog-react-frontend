/* eslint-disable no-undef */
import { responseItems } from 'references/scripts/__mocks__/apiCalls';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchPosts, addPost } from '../posts';
import { FETCH_POSTS, ADD_POST } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('references/scripts/apiCalls');

describe('actions/posts', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('should create FETCH_POSTS when done fetching', async () => {
    await store
      .dispatch(fetchPosts('1'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toMatchObject({
          type: FETCH_POSTS,
          payload: responseItems,
        });
      })
      .catch(console.log);
  });

  it('should create ADD_POST when done adding post', () => {
    const post = {
      name: 'yo',
      id: '1',
    };
    store.dispatch(addPost(post));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: ADD_POST,
      payload: post,
    });
  });
});
