import api from 'utils/apiCalls';
import { actionNameUtil } from 'middlewares/automate-async-action';
import { UsersType } from './types';

/**
 * dispatch a fetchUsers action
 */
export const fetchUsers = () => (dispatch) =>
  dispatch({
    type: UsersType.FETCH_USERS,
    payload: '',
  });

/**
 * dispatch a signIn action which logs an user in and return a token to the state
 *
 * @param {string} username username
 * @param {string} password password
 */
export const signIn = (username, password) => (dispatch) => {
  dispatch({
    type: UsersType.SIGN_IN,
    promise: api.signIn(username, password),
    username,
  });
};

/**
 * dispatch a signOut action which clears the current state
 *
 */
export const signOut = () => ({
  type: UsersType.SIGN_OUT,
  payload: {},
});

/**
 * dispatch a createUser action and a signIn action which creates a new user and sign that user in
 * @param {string} username username
 * @param {string} password password
 * @param {string} email email
 * @param {string} name name
 *
 */
export const createUser = (username, password, email, name) => async (dispatch) => {
  const response = await dispatch({
    type: UsersType.CREATE_USER,
    promise: api.createUser(username, password, email, name),
  });
  if (response.type === actionNameUtil.createSuccess(UsersType.CREATE_USER)) {
    dispatch(signIn(username, password));
  }
};

/**
 * dispatch a fetchCurrentUserPosts action which fetches all the posts by the current user
 *
 * @param {string} token valid user token
 */
export const fetchCurrentUserPost = (token) => (dispatch) => {
  dispatch({
    type: UsersType.FETCH_CURRENT_USER_POST,
    promise: api.fetchCurrentUserPosts(token),
  });
};

/**
 *
 * dispatch a deletePost action which deletes a selected post and refetch the posts
 *
 * @param {string} token valid user token
 * @param {string} categoryId category id of the post to be deleted
 * @param {string} postId post if of the post to be deleted
 */
export const deletePostAndRefetch = (token, categoryId, postId) => (dispatch) => {
  dispatch({
    type: UsersType.DELETE_POST,
    promise: api.deletePost(token, categoryId, postId),
  });
  dispatch(fetchCurrentUserPost(token));
};

/**
 * Dispatch a clearError action which reset error messages to an empty array
 */
export const clearError = () => ({
  type: UsersType.CLEAR_ERROR,
});
