import api from 'utils/apiCalls';
import { PostsType } from './types';

export const fetchPosts = (id) => (dispatch) =>
  api.fetchItems(id).then((fetchedItems) =>
    dispatch({
      type: PostsType.FETCH_POSTS,
      payload: fetchedItems,
    }),
  );

export const addPostAndRefetch = (token, categoryId, post) => (dispatch) =>
  api.addPost(token, categoryId, post).then(() => dispatch(fetchPosts(categoryId)));

export const modifyPostAndRefetch = (token, categoryId, postId, post) => (dispatch) =>
  api.modifyPost(token, categoryId, postId, post).then(() => dispatch(fetchPosts(categoryId)));
