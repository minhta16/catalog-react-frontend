/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signIn } from '../users';
import { SIGN_IN } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('references/scripts/apiCalls');

describe('actions/users', () => {
  const store = mockStore({});

  it('should create SIGN_IN when done signing in', () => {
    store.dispatch(signIn('abc', 'abc')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: SIGN_IN,
        payload: {
          username: 'abc',
          token: 'abc',
        },
      });
    });
  });
});
