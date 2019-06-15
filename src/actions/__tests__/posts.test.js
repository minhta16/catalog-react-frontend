/* eslint-disable no-undef */
import api from 'utils/__mocks__/apiCalls';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PostsType } from 'actions/types';
import { fetchPosts, addPostAndRefetch, modifyPostAndRefetch } from '../posts';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('utils/apiCalls');

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
          type: PostsType.FETCH_POSTS,
          payload: api.responseItems,
        });
      })
      .catch(console.log);
  });

  it('should create FETCH_POST when done adding post and refetching', () => {
    const post = {
      name: 'yo',
      id: '1',
    };
    store.dispatch(addPostAndRefetch(post)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toMatchObject({
        type: PostsType.FETCH_POSTS,
        payload: api.responseItems,
      });
    });
  });

  it('should create FETCH_POST when done modifying post and refetching', () => {
    const post = {
      name: 'yo',
      id: '1',
    };
    store.dispatch(modifyPostAndRefetch(post)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toMatchObject({
        type: PostsType.FETCH_POSTS,
        payload: api.responseItems,
      });
    });
  });
});
