/* eslint-disable no-undef */
import { selectCurrentUser } from '../users';

describe('selectors/posts', () => {
  let state;
  beforeEach(() => {
    state = {
      currentUser: {
        name: 'abc',
        token: 'abc',
      },
    };
  });

  it('should select the correct post', () => {
    const currentUser = {
      name: 'abc',
      token: 'abc',
    };
    expect(selectCurrentUser(state)).toMatchObject(currentUser);
  });
});
