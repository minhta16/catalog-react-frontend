export const selectCurrentUser = (state) => state.currentUser;

export const selectCurrentUserPosts = (state) => {
  return Object.assign([], state.currentUser.posts);
};

export const selectCurrentUserPost = (state, id) => state.currentUser.posts[id];
