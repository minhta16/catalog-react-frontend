import { actionNameUtil } from 'middlewares/automate-async-action';
import { UsersType } from '../actions/types';

const initialState = {
  currentUser: {
    username: '',
    token: '',
  },
  posts: {},
  loading: false,
  error: {},
  errorMessage: '',
};

// eslint-disable-next-line import/prefer-default-export
export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersType.SIGN_IN:
      return { ...state, currentUser: { ...state.currentUser, username: action.username } };
    case actionNameUtil.createRequest(UsersType.SIGN_IN):
      return { ...state, loading: true };
    case actionNameUtil.createSuccess(UsersType.SIGN_IN):
      return {
        ...state,
        currentUser: { ...state.currentUser, token: action.payload.access_token },
        loading: false,
        error: {},
        errorMessage: '',
      };
    case actionNameUtil.createFailure(UsersType.SIGN_IN):
      return {
        ...state,
        error: action.payload,
        errorMessage: 'Invalid username or password. Try again.',
      };
    case UsersType.SIGN_OUT:
      return initialState;
    case actionNameUtil.createRequest(UsersType.FETCH_CURRENT_USER_POST):
      return { ...state, loading: true };
    case actionNameUtil.createSuccess(UsersType.FETCH_CURRENT_USER_POST): {
      let posts = {};
      action.payload.forEach((post) => {
        posts = { ...posts, [post.id]: post };
      });
      return { ...state, posts, loading: false, error: {}, errorMessage: '' };
    }
    case actionNameUtil.createFailure(UsersType.FETCH_CURRENT_USER_POST):
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
