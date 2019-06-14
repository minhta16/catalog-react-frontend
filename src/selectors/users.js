export const selectCurrentUser = (state) => state.currentUser;

export const selectCurrentUserProp = (state, prop) => state.currentUser[prop];

export const selectCurrentUserPosts = (state, order) => {
  switch (order) {
    case 'reverse':
      return Object.values(state.currentUser.posts || {})
        .slice()
        .reverse();
    default:
      return Object.values(state.currentUser.posts || {});
  }
};

export const selectCurrentUserPost = (state, id) => state.currentUser.posts[id];
