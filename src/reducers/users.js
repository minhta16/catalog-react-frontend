import {
  FETCH_USERS,
  SIGN_IN,
  SIGN_OUT,
  FETCH_CURRENT_USER_POST,
  AUTH_ERROR,
} from '../actions/types';

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};

const initialState = {
  username: '',
  token: '',
  posts: {},
  error: false,
  errorMessage: '',
};
export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...initialState, ...action.payload };
    case SIGN_OUT:
      return initialState;
    case FETCH_CURRENT_USER_POST:
      return { ...state, posts: action.payload };
    case AUTH_ERROR:
      return { ...state, error: true, errorMessage: 'Invalid username or password. Try again.' };
    default:
      return state;
  }
};
