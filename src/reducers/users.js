import { UsersType } from '../actions/types';

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case UsersType.FETCH_USERS:
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
    case UsersType.SIGN_IN:
      return { ...initialState, ...action.payload };
    case UsersType.SIGN_OUT:
      return initialState;
    case UsersType.FETCH_CURRENT_USER_POST:
      return { ...state, posts: action.payload };
    case UsersType.AUTH_ERROR:
      return { ...state, error: true, errorMessage: 'Invalid username or password. Try again.' };
    default:
      return state;
  }
};
