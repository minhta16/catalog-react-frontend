/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { responseItemsArr } from 'utils/__mocks__/apiCalls';
import { signIn, fetchUsers, createUserAndSignIn, fetchCurrentUserPost } from '../users';
import { SIGN_IN, FETCH_USERS, FETCH_CURRENT_USER_POST } from '../types';

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
      type: FETCH_USERS,
      payload: '',
    });
  });

  it('should create SIGN_IN when done signing in', async () => {
    await store.dispatch(signIn('abc', 'abc')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: SIGN_IN,
        payload: {
          username: 'abc',
          token: 'abc',
          posts: {},
        },
      });
    });
  });

  it('should create SIGN_IN when done creating user and signing in', async () => {
    await store.dispatch(createUserAndSignIn('abc', 'abc', 'abc', 'abc')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: SIGN_IN,
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
        type: FETCH_CURRENT_USER_POST,
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