import api from 'utils/apiCalls';
import { PostsType } from './types';

export const fetchPosts = (id) => (dispatch) =>
  dispatch({
    type: PostsType.FETCH_POSTS,
    promise: api.fetchItems(id),
  });

export const addPostAndRefetch = (token, categoryId, post) => (dispatch) => {
  dispatch({
    type: PostsType.ADD_POST,
    promise: api.addPost(token, categoryId, post),
  });
  Promise.resolve(1).then(() => dispatch(fetchPosts(categoryId)));
};

export const modifyPostAndRefetch = (token, categoryId, postId, post) => (dispatch) => {
  dispatch({
    type: PostsType.MODIFY_POST,
    promise: api.modifyPost(token, categoryId, postId, post),
  });
  Promise.resolve(1).then(() => dispatch(fetchPosts(categoryId)));
};
