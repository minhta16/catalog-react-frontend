/* eslint-disable no-undef */
import postsReducer from '../posts';
import { FETCH_POSTS } from '../../actions/types';

describe('reducers/posts', () => {
  it('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual({ 0: { name: '' } });
  });

  it('should return the payload with FETCH_POSTS', () => {
    const action = {
      type: FETCH_POSTS,
      payload: 'yum',
    };
    expect(postsReducer({}, action)).toEqual(action.payload);
  });
});
