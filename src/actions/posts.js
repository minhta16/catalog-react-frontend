import { fetchApiItems, addPostApi, modifyPostApi } from 'utils/apiCalls';
import { FETCH_POSTS } from './types';

export const fetchPosts = (id) => (dispatch) =>
  fetchApiItems(id).then((fetchedItems) =>
    dispatch({
      type: FETCH_POSTS,
      payload: fetchedItems,
    }),
  );

export const addPostAndRefetch = (token, categoryId, post) => (dispatch) =>
  addPostApi(token, categoryId, post).then((data) => {
    console.log(data);
    dispatch(fetchPosts(categoryId));
  });

export const modifyPostAndRefetch = (token, categoryId, postId, post) => (dispatch) =>
  modifyPostApi(token, categoryId, postId, post).then((data) => {
    console.log(data);
    dispatch(fetchPosts(categoryId));
  });
