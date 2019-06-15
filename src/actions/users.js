import api from 'utils/apiCalls';
import { UsersType } from './types';

export const fetchUsers = () => (dispatch) =>
  dispatch({
    type: UsersType.FETCH_USERS,
    payload: '',
  });

export const signIn = (username, password) => (dispatch) =>
  api
    .signIn(username, password)
    .then((data) => {
      const currentUser = {
        username,
        token: data.access_token,
        posts: {},
      };
      return dispatch({
        type: UsersType.SIGN_IN,
        payload: currentUser,
      });
    })
    .catch((error) =>
      dispatch({
        type: UsersType.AUTH_ERROR,
        payload: error,
      }),
    );

export const signOut = () => ({
  type: UsersType.SIGN_OUT,
  payload: {},
});

export const createUserAndSignIn = (username, password, email, name) => (dispatch) =>
  api
    .createUserAndSignin(username, password, email, name)
    .then((data) => {
      const currentUser = {
        username,
        token: data.access_token,
        posts: {},
      };
      return dispatch({
        type: UsersType.SIGN_IN,
        payload: currentUser,
      });
    })
    .catch((error) =>
      dispatch({
        type: UsersType.AUTH_ERROR,
        payload: error,
      }),
    );

export const fetchCurrentUserPost = (token) => (dispatch) =>
  api.fetchCurrentUserPosts(token).then((data) => {
    let posts = {};
    data.forEach((post) => {
      posts = { ...posts, [post.id]: post };
    });
    return dispatch({
      type: UsersType.FETCH_CURRENT_USER_POST,
      payload: posts,
    });
  });

export const deletePostAndRefetch = (token, categoryId, postId) => (dispatch) =>
  api.deletePost(token, categoryId, postId).then(() => dispatch(fetchCurrentUserPost(token)));
