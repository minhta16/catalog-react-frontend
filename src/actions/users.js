import api from 'utils/apiCalls';
import { UsersType } from './types';

export const fetchUsers = () => (dispatch) =>
  dispatch({
    type: UsersType.FETCH_USERS,
    payload: '',
  });

export const signIn = (username, password) => (dispatch) =>
  dispatch({
    type: UsersType.SIGN_IN,
    promise: api.signIn(username, password),
    username,
  });

export const signOut = () => ({
  type: UsersType.SIGN_OUT,
  payload: {},
});

export const createUserAndSignIn = (username, password, email, name) => (dispatch) => {
  dispatch({
    type: UsersType.CREATE_USER,
    promise: api.createUser(username, password, email, name),
  });
  Promise.resolve(1).then(() => {
    dispatch(signIn(username, password));
  });
};

export const fetchCurrentUserPost = (token) => (dispatch) =>
  dispatch({
    type: UsersType.FETCH_CURRENT_USER_POST,
    promise: api.fetchCurrentUserPosts(token),
  });

export const deletePostAndRefetch = (token, categoryId, postId) => (dispatch) => {
  dispatch({
    type: UsersType.DELETE_POST,
    promise: api.deletePost(token, categoryId, postId),
  });
  Promise.resolve(1).then(() => dispatch(fetchCurrentUserPost(token)));
};
