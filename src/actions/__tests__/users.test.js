/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signIn, fetchUsers, createUserAndSignIn } from '../users';
import { SIGN_IN, FETCH_USERS } from '../types';

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
});
