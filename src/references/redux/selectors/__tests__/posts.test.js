/* eslint-disable no-undef */
import { selectPost } from '../posts';

describe('selectors/posts', () => {
  let state;
  beforeEach(() => {
    state = {
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
    };
  });

  it('should select the correct post', () => {
    const post = { name: 'yo', id: '1' };
    expect(selectPost(state, 1)).toMatchObject(post);
  });
});
