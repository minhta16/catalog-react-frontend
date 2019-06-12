import { FETCH_USERS, SIGN_IN, SIGN_OUT } from '../actions/types';

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
};
