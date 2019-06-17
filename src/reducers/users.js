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
  createAccountSuccess: false,
};

// eslint-disable-next-line import/prefer-default-export
export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersType.CLEAR_ERROR:
      return { ...state, error: {} };
    case actionNameUtil.createRequest(UsersType.SIGN_IN):
      return { ...state, loading: true };
    // Format the state of currentUser when SIGN_IN_SUCCESS
    case actionNameUtil.createSuccess(UsersType.SIGN_IN):
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          token: action.payload.access_token,
          username: action.username,
        },
        loading: false,
        error: {},
      };
    case actionNameUtil.createFailure(UsersType.SIGN_IN):
      return {
        ...state,
        error: action.payload,
      };

    case actionNameUtil.createRequest(UsersType.CREATE_USER):
      return {
        ...state,
        loading: true,
        createAccountSuccess: false,
      };
    case actionNameUtil.createSuccess(UsersType.CREATE_USER):
      return {
        ...state,
        createAccountSuccess: true,
      };
    case actionNameUtil.createFailure(UsersType.CREATE_USER):
      return {
        ...state,
        error: action.payload,
        createAccountSuccess: false,
      };
    case UsersType.SIGN_OUT:
      return initialState;
    case actionNameUtil.createRequest(UsersType.FETCH_CURRENT_USER_POST):
      return { ...state, loading: true };
    // Format the state shape of userPosts when FETCH_CURRENT_USER_POST_SUCCESS
    case actionNameUtil.createSuccess(UsersType.FETCH_CURRENT_USER_POST): {
      let posts = {};
      action.payload.forEach((post) => {
        posts = { ...posts, [post.id]: post };
      });
      return { ...state, posts, loading: false, error: {} };
    }
    case actionNameUtil.createFailure(UsersType.FETCH_CURRENT_USER_POST):
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
