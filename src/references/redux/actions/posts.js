import { fetchApiItems } from 'references/scripts/apiCalls';
import { ADD_POST, FETCH_POSTS } from './types';

export const addPost = post => (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: post,
  });
};

export const fetchPosts = id => (dispatch) => {
  const posts = fetchApiItems(id);
  dispatch({
    type: FETCH_POSTS,
    payload: posts,
  });
};
