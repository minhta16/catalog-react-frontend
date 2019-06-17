export const selectPost = (state, id) => state.postsReducer.posts[id];

/**
 * Return the posts
 * @param {object} state currentState
 * @param {string} order reverse
 */
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

export const selectPostLoading = (state) => state.postsReducer.loading;

export const selectAddPostSuccess = (state) => state.postsReducer.addPostSuccess;
