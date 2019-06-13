export const selectCurrentUser = (state) => state.currentUser;

export const selectCurrentUserProp = (state, prop) => state.currentUser[prop];

export const selectCurrentUserPosts = (state) => {
  return Object.values(state.currentUser.posts);
};

export const selectCurrentUserPost = (state, id) => state.currentUser.posts[id];
