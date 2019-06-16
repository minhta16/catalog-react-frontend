/* eslint-disable no-undef */
import { selectPost, selectAllPosts } from '../posts';

describe('selectors/posts', () => {
  let state;
  beforeEach(() => {
    state = {
      postsReducer: {
        posts: {
          1: {
            name: 'yo',
            id: '1',
          },
          2: {
            name: 'bro',
            id: '2',
          },
        },
      },
    };
  });

  it('should select the correct post', () => {
    const post = { name: 'yo', id: '1' };
    expect(selectPost(state, 1)).toMatchObject(post);
  });

  it('should select all correct posts', () => {
    const posts = [{ name: 'yo', id: '1' }, { name: 'bro', id: '2' }];
    expect(selectAllPosts(state)).toMatchObject(posts);
  });

  it('should reverse all posts if we use reverse', () => {
    const posts = [{ name: 'yo', id: '1' }, { name: 'bro', id: '2' }];
    expect(selectAllPosts(state, 'reverse')).toMatchObject(posts.reverse());
  });
});
