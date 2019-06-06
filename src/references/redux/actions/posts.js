import { ADD_POST, FETCH_POSTS } from './types';

export const addPost = post => (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: post,
  });
};

export const fetchPosts = () => dispatch => dispatch({
  type: FETCH_POSTS,
});
