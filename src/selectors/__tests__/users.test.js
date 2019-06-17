/* eslint-disable no-undef */
import {
  selectCurrentUser,
  selectCurrentUserPosts,
  selectCurrentUserPost,
  selectCurrentUserProp,
  selectCurrentUserLoading,
  selectLoginErrorMessage,
} from '../users';

describe('selectors/users', () => {
  let state;

  const posts = {
    1: {
      name: 'one',
      id: '1',
    },
    2: {
      name: 'two',
      id: '2',
    },
  };

  const postsArr = [
    {
      name: 'one',
      id: '1',
    },
    {
      name: 'two',
      id: '2',
    },
  ];

  const currentUser = {
    name: 'abc',
    token: 'abc',
  };

  beforeEach(() => {
    state = {
      currentUserReducer: {
        currentUser,
        posts,
        loading: true,
        errorMessage: 'error',
      },
    };
  });

  it('should select the correct user', () => {
    expect(selectCurrentUser(state)).toMatchObject(currentUser);
  });

  it('should select the user prop with selectCurrentUserProp', () => {
    expect(selectCurrentUserProp(state, 'name')).toBe('abc');

    expect(selectCurrentUserProp(state, 'token')).toBe('abc');
  });

  it('should select the correct post', () => {
    expect(selectCurrentUserPosts(state)).toMatchObject(postsArr);
  });

  it('should select an empty array if posts is undefined', () => {
    state.currentUserReducer.posts = undefined;
    expect(selectCurrentUserPosts(state)).toEqual([]);
  });

  it('should revsere the posts if "reverse" is passed', () => {
    expect(selectCurrentUserPosts(state, 'reverse')).toMatchObject(postsArr.slice().reverse());
  });

  it('should return empty if state.posts is empty', () => {
    state.currentUserReducer.posts = {};
    expect(selectCurrentUserPosts(state)).toMatchObject({});
    expect(selectCurrentUserPosts(state, 'reverse')).toMatchObject({});
  });

  it('should select the correct post with id', () => {
    expect(selectCurrentUserPost(state, '1')).toMatchObject({
      name: 'one',
      id: '1',
    });
  });

  it('should select the correct loading', () => {
    expect(selectCurrentUserLoading(state)).toBe(true);
  });

  it('should select the correct error message', () => {
    expect(selectLoginErrorMessage(state)).toBe('error');
  });
});
