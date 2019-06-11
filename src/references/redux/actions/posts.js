import { fetchApiItems } from 'references/scripts/apiCalls';
import { ADD_POST, FETCH_POSTS } from './types';

export const fetchPosts = (id) => (dispatch) => {
  fetchApiItems(id).then((fetchedItems) => {
    dispatch({
      type: FETCH_POSTS,
      payload: fetchedItems,
    });
  });
};

export const addPost = (post) => (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: post,
  });
};
