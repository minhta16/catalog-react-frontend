export const selectPost = (state, id) => state.posts[id];

export const selectAllPosts = (state, order) => {
  switch (order) {
    case 'reverse':
      return Object.values(state.posts)
        .slice()
        .reverse();
    default:
      return Object.values(state.posts);
  }
};
