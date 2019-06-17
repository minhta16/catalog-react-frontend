import api from 'utils/apiCalls';
import { PostsType } from './types';

/**
 *
 * dispatch a fetchItems action to fetch all items in a selected category
 *
 * @param {string} id post Id that needs to fetch
 *
 */
export const fetchPosts = (id) => (dispatch) =>
  dispatch({
    type: PostsType.FETCH_POSTS,
    promise: api.fetchItems(id),
  });

/**
 * dispatch an addPost action to add a post to an existing category
 *
 * @param {string} token valid user token
 * @param {string} categoryId category id that post needs to be added to
 * @param {object} post post information
 */
export const addPostAndRefetch = (token, categoryId, post) => (dispatch) => {
  dispatch({
    type: PostsType.ADD_POST,
    promise: api.addPost(token, categoryId, post),
  });
  // Redux-promise or fix middleware
  dispatch(fetchPosts(categoryId));
};

/**
 * dispatch a modifyPost action to modify a post
 *
 * @param {string} token valid user token
 * @param {string} categoryId category id that post needs to be added to
 * @param {string} postId post id that needs to be modifed
 * @param {object} post post information
 */
export const modifyPostAndRefetch = (token, categoryId, postId, post) => (dispatch) => {
  dispatch({
    type: PostsType.MODIFY_POST,
    promise: api.modifyPost(token, categoryId, postId, post),
  });
  dispatch(fetchPosts(categoryId));
};

/**
 * dispatch a resetAddPostSuccess action to reset addPostSuccess to false
 */
export const resetAddPostSuccess = () => (dispatch) => {
  dispatch({
    type: PostsType.RESET_ADD_POST_SUCCESS,
  });
};
