export const selectCurrentUser = (state) => state.currentUserReducer.currentUser;

export const selectLoginErrorMessage = (state) => state.currentUserReducer.error.message;

export const selectCurrentUserProp = (state, prop) => state.currentUserReducer.currentUser[prop];

/**
 * Return current user's posts
 * @param {object} state current state
 * @param {string} order reverse
 */
export const selectCurrentUserPosts = (state, order) => {
  switch (order) {
    case 'reverse':
      return Object.values(state.currentUserReducer.posts || {})
        .slice()
        .reverse();
    default:
      return Object.values(state.currentUserReducer.posts || {});
  }
};

export const selectCurrentUserPost = (state, id) => state.currentUserReducer.posts[id];

export const selectCurrentUserLoading = (state) => state.currentUserReducer.loading;

export const selectCreateAccountSuccess = (state) => state.currentUserReducer.createAccountSuccess;
