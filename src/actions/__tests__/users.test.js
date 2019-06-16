/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from 'utils/apiCalls';
import {
  signIn,
  fetchUsers,
  createUserAndSignIn,
  fetchCurrentUserPost,
  deletePostAndRefetch,
} from '../users';
import { UsersType } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('utils/apiCalls');

describe('actions/users', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('should create FETCH_USERS when fetching users', () => {
    store.dispatch(fetchUsers());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UsersType.FETCH_USERS,
      payload: '',
    });
  });

  it('should create SIGN_IN when done signing in', async () => {
    store.dispatch(signIn('abc', 'abc'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UsersType.SIGN_IN,
      promise: api.signIn('abc', 'abc'),
      username: 'abc',
    });
  });

  it('should create CREATE_USER and then SIGN_IN when done creating user and signing in', async () => {
    store.dispatch(createUserAndSignIn('username', 'password', 'email', 'name'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UsersType.CREATE_USER,
      promise: api.createUser('username', 'password'),
    });
    Promise.resolve(1).then(() =>
      expect(actions[1]).toEqual({
        type: UsersType.SIGN_IN,
        promise: api.signIn('username', 'password'),
        username: 'username',
      }),
    );
  });

  it('should create FETCH_CURRENT_USER_POST when done fetching', async () => {
    store.dispatch(fetchCurrentUserPost('abcxyz'));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersType.FETCH_CURRENT_USER_POST,
      promise: api.fetchCurrentUserPosts('abcxyz'),
    });
  });

  it('should create DELETE_POST and then FETCH_CURRENT_USER_POST when done deleting', async () => {
    store.dispatch(deletePostAndRefetch('abcxyz', '1', '2'));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersType.DELETE_POST,
      promise: api.deletePost('abcxyz', '1', '2'),
    });
    Promise.resolve(1).then(() =>
      expect(actions[1]).toMatchObject({
        type: UsersType.FETCH_CURRENT_USER_POST,
        promise: api.fetchCurrentUserPosts('abcxyz'),
      }),
    );
  });
});
