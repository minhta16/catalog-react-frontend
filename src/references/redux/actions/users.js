import { signInApi, createUserAndSigninApi } from 'references/scripts/apiCalls';
import { FETCH_USERS, SIGN_IN, SIGN_OUT } from './types';

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
    };
    return dispatch({
      type: SIGN_IN,
      payload: currentUser,
    });
  });
