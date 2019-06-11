import { signInApi } from 'references/scripts/apiCalls';
import { FETCH_USERS, SIGN_IN } from './types';

export const fetchUsers = () => (dispatch) => {
  dispatch({
    type: FETCH_USERS,
    payload: '',
  });
};

export const signIn = (username, password) => (dispatch) => {
  signInApi(username, password).then((token) => {
    const currentUser = {
      username,
      token,
    };
    dispatch({
      type: SIGN_IN,
      payload: currentUser,
    });
  });
};
