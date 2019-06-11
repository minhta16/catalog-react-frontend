import { signInApi, createUserAndSigninApi } from 'references/scripts/apiCalls';
import { FETCH_USERS, SIGN_IN } from './types';

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

export const createUserAndSignIn = (username, name, email, password) => (dispatch) =>
  createUserAndSigninApi(username, name, email, password).then((data) => {
    const currentUser = {
      username,
      token: data.access_token,
    };
    return dispatch({
      type: SIGN_IN,
      payload: currentUser,
    });
  });
