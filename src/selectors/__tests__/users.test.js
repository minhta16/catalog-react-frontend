/* eslint-disable no-undef */
import {
  selectCurrentUser,
  selectCurrentUserPosts,
  selectCurrentUserPost,
  selectCurrentUserProp,
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
    posts,
  };

  beforeEach(() => {
    state = {
      currentUser,
    };
  });

  it('should select the correct user', () => {
    expect(selectCurrentUser(state)).toMatchObject(currentUser);
  });

  it('should select the user prop with selectCurrentUserProp', () => {
    expect(selectCurrentUserProp(state, 'name')).toBe('abc');

    expect(selectCurrentUserProp(state, 'token')).toBe('abc');

    expect(selectCurrentUserProp(state, 'posts')).toBe(posts);
  });

  it('should select the correct post', () => {
    expect(selectCurrentUserPosts(state)).toMatchObject(postsArr);
  });

  it('should revsere the posts if "reverse" is passed', () => {
    expect(selectCurrentUserPosts(state, 'reverse')).toMatchObject(postsArr.slice().reverse());
  });

  it('should return empty if state.posts is emptyy', () => {
    expect(selectCurrentUserPosts({ currentUser: {} })).toMatchObject({});
    expect(selectCurrentUserPosts({ currentUser: {} }, 'reverse')).toMatchObject({});
  });

  it('should select the correct post with id', () => {
    expect(selectCurrentUserPost(state, '1')).toMatchObject({
      name: 'one',
      id: '1',
    });
  });
});
