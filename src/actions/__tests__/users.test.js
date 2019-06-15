/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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
    await store.dispatch(signIn('abc', 'abc')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: UsersType.SIGN_IN,
        payload: {
          username: 'abc',
          token: 'abc',
          posts: {},
        },
      });
    });
  });

  it('should create AUTH_ERROR when sign in causes an error', async () => {
    await store.dispatch(signIn('error', 'abc')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: UsersType.AUTH_ERROR,
        payload: {
          ok: false,
        },
      });
    });
  });

  it('should create SIGN_IN when done creating user and signing in', async () => {
    await store.dispatch(createUserAndSignIn('abc', 'abc', 'abc', 'abc')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: UsersType.SIGN_IN,
        payload: {
          username: 'abc',
          token: 'abc',
          posts: {},
        },
      });
    });
  });

  it('should create FETCH_CURRENT_USER_POST when done fetching', async () => {
    await store.dispatch(fetchCurrentUserPost('abcxyz')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toMatchObject({
        type: UsersType.FETCH_CURRENT_USER_POST,
        payload: {
          4: {
            id: 4,
            name: 'item name 1',
            description: 'item description 1',
            price: 30.5,
            user_id: 4,
            category_id: 2,
            created: '2015-08-05T08:40:51.620Z',
            updated: '2018-04-03T08:40:51.620Z',
          },
          8: {
            id: 8,
            name: 'item name 2',
            description: 'item description 2',
            price: 32.7,
            user_id: 18,
            category_id: 2,
            created: '2015-08-05T08:40:51.620Z',
            updated: '2018-04-03T08:40:51.620Z',
          },
        },
      });
    });
  });

  it('should create FETCH_CURRENT_USER_POST when done deleting post', async () => {
    await store.dispatch(deletePostAndRefetch('abcxyz', 1, 2)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toMatchObject({
        type: UsersType.FETCH_CURRENT_USER_POST,
        payload: {
          4: {
            id: 4,
            name: 'item name 1',
            description: 'item description 1',
            price: 30.5,
            user_id: 4,
            category_id: 2,
            created: '2015-08-05T08:40:51.620Z',
            updated: '2018-04-03T08:40:51.620Z',
          },
          8: {
            id: 8,
            name: 'item name 2',
            description: 'item description 2',
            price: 32.7,
            user_id: 18,
            category_id: 2,
            created: '2015-08-05T08:40:51.620Z',
            updated: '2018-04-03T08:40:51.620Z',
          },
        },
      });
    });
  });
});
