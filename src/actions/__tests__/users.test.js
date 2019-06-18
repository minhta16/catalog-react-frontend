/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import automateAsync, { actionNameUtil } from 'middlewares/automate-async-action';
import api from 'utils/apiCalls';
import {
  signIn,
  fetchUsers,
  createUser,
  fetchCurrentUserPost,
  deletePostAndRefetch,
  clearError,
  signOut,
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

  it('should create SIGN_OUT when user sign out', async () => {
    store.dispatch(signOut());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UsersType.SIGN_OUT,
      payload: {},
    });
  });

  it('should create CREATE_USER when done creating user', async () => {
    const otherStore = configureStore([thunk, automateAsync])({});
    await otherStore.dispatch(createUser('username', 'password', 'email', 'name'));
    const actions = otherStore.getActions();
    expect(actions[0]).toEqual({
      type: actionNameUtil.createRequest(UsersType.CREATE_USER),
    });

    expect(actions[2]).toEqual({
      type: actionNameUtil.createRequest(UsersType.SIGN_IN),
    });
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

  it('should create CLEAR_ERROR when clear error', () => {
    store.dispatch(clearError());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersType.CLEAR_ERROR,
    });
  });
});
