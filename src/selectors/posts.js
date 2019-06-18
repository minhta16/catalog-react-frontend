/**
 * Return an object of a post which has the provided id
 *
 * @param {object} state current state
 * @param {string} id post id
 */
export const selectPost = (state, id) => state.postsReducer.posts[id];

/**
 * Return an array of posts
 *
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

/**
 * Return an array of error messages
 *
 * @param {object} state current state
 */
export const selectAddPostError = (state) => state.postsReducer.error.message;

/**
 * Return a boolen which represent the loading state of postReducer
 *
 * @param {object} state current state
 */
export const selectPostLoading = (state) => state.postsReducer.loading;

/**
 * Return a boolean which is true when add post is success
 *
 * @param {object} state current state
 */
export const selectAddPostSuccess = (state) => state.postsReducer.addPostSuccess;
