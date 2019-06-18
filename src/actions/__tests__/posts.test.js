/* eslint-disable no-undef */
import api from 'utils/apiCalls';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PostsType } from 'actions/types';
import { fetchPosts, addPost, modifyPost, resetAddPostSuccess, clearPostError } from '../posts';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('utils/apiCalls');

describe('actions/posts', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('should create FETCH_POSTS when done fetching', async () => {
    store.dispatch(fetchPosts('1'));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: PostsType.FETCH_POSTS,
      promise: api.fetchItems('1'),
    });
  });

  it('should create FETCH_POST when done adding post', () => {
    const post = {
      name: 'yo',
      id: '1',
    };
    store.dispatch(addPost('value', '1', post));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: PostsType.ADD_POST,
      promise: api.addPost('value', '1', post),
    });
  });

  it('should create FETCH_POST when done adding post', () => {
    const post = {
      name: 'yo',
      id: '1',
    };
    store.dispatch(modifyPost('value', '1', '1', post));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: PostsType.MODIFY_POST,
      promise: api.addPost('value', '1', '1', post),
    });
  });

  it('should create CLEAR_ERROR when clear error', () => {
    store.dispatch(clearPostError());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: PostsType.CLEAR_ERROR,
    });
  });

  it('should create RESET_ADD_POST_SUCCESS when reset post success', () => {
    store.dispatch(resetAddPostSuccess());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: PostsType.RESET_ADD_POST_SUCCESS,
    });
  });
});
