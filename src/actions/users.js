import {
  signInApi,
  createUserAndSigninApi,
  fetchCurrentUserPostsApi,
  deletePostApi,
} from 'utils/apiCalls';
import { FETCH_USERS, SIGN_IN, SIGN_OUT, FETCH_CURRENT_USER_POST } from './types';

export const fetchUsers = () => (dispatch) =>
  dispatch({
    type: FETCH_USERS,
    payload: '',
  });

export const signIn = (username, password) => (dispatch) =>
  signInApi(username, password).then((data) => {
    const currentUser = {
      username,
      token: data.access_token,
      posts: {},
    };
    return dispatch({
      type: SIGN_IN,
      payload: currentUser,
    });
  });

export const signOut = () => ({
  type: SIGN_OUT,
  payload: {},
});

export const createUserAndSignIn = (username, password, email, name) => (dispatch) =>
  createUserAndSigninApi(username, password, email, name).then((data) => {
    const currentUser = {
      username,
      token: data.access_token,
      posts: {},
    };
    return dispatch({
      type: SIGN_IN,
      payload: currentUser,
    });
  });

export const fetchCurrentUserPost = (token) => (dispatch) =>
  fetchCurrentUserPostsApi(token).then((data) => {
    let posts = {};
    data.forEach((post) => {
      posts = { ...posts, [post.id]: post };
    });
    return dispatch({
      type: FETCH_CURRENT_USER_POST,
      payload: posts,
    });
  });

export const deletePostAndRefetch = (token, categoryId, postId) => (dispatch) =>
  deletePostApi(token, categoryId, postId).then(() => dispatch(fetchCurrentUserPost(token)));
