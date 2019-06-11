export const selectPost = (state, id) => state.posts[id];

export const selectAllPosts = (state) => {
  let posts = [];
  Object.keys(state.posts).forEach((key) => {
    posts = [...posts, state.posts[key]];
  });
  return posts;
};
