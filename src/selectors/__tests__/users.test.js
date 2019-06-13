/* eslint-disable no-undef */
import { selectCurrentUser, selectCurrentUserPosts, selectCurrentUserPost } from '../users';

describe('selectors/users', () => {
  let state;

  beforeEach(() => {
    state = {
      currentUser: {
        name: 'abc',
        token: 'abc',
        posts: {
          1: {
            name: 'one',
            id: '1',
          },
          2: {
            name: 'two',
            id: '2',
          },
        },
      },
    };
  });

  it('should select the correct user', () => {
    const currentUser = {
      name: 'abc',
      token: 'abc',
      posts: {
        1: {
          name: 'one',
          id: '1',
        },
        2: {
          name: 'two',
          id: '2',
        },
      },
    };
    expect(selectCurrentUser(state)).toMatchObject(currentUser);
  });

  it('should select the correct post', () => {
    expect(selectCurrentUserPosts(state)).toMatchObject([
      {
        name: 'one',
        id: '1',
      },
      {
        name: 'two',
        id: '2',
      },
    ]);
  });

  it('should select the correct post with id', () => {
    expect(selectCurrentUserPost(state, '1')).toMatchObject({
      name: 'one',
      id: '1',
    });
  });
});
