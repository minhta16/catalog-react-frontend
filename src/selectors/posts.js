export const selectPost = (state, id) => state.postsReducer.posts[id];

export const selectAllPosts = (state, order) => {
  switch (order) {
    case 'reverse':
      return Object.values(state.postsReducer.posts)
        .slice()
        .reverse();
    default:
      return Object.values(state.postsReducer.posts);
  }
};
