export const selectCurrentUser = (state) => state.currentUserReducer.currentUser;

export const selectLoginErrorMessage = (state) => state.currentUserReducer.errorMessage;

export const selectCurrentUserProp = (state, prop) => state.currentUserReducer.currentUser[prop];

export const selectCurrentUserPosts = (state, order) => {
  switch (order) {
    case 'reverse':
      return Object.values(state.currentUserReducer.posts)
        .slice()
        .reverse();
    default:
      return Object.values(state.currentUserReducer.posts || {});
  }
};

export const selectCurrentUserPost = (state, id) => state.currentUserReducer.posts[id];

export const selectCurrentUserLoading = (state) => state.currentUserReducer.loading;
