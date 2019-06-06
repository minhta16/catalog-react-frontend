import { ADD_POST, GET_POSTS } from './types';

export const addPost = post => (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: post,
  });
};

export const getPosts = () => dispatch => dispatch({
  type: GET_POSTS,
});
