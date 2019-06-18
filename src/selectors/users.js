/**
 * Return an object which contains current user information
 * @param {object} state current state
 */
export const selectCurrentUser = (state) => state.currentUserReducer.currentUser;

/**
 * Return an array of error messages
 *
 * @param {object} state current state
 */
export const selectLoginErrorMessage = (state) => state.currentUserReducer.error.message;

/**
 * Return the prop of currentUser which matches the propName
 *
 * @param {object} state current state
 * @param {string} propName propName
 */
export const selectCurrentUserProp = (state, propName) =>
  state.currentUserReducer.currentUser[propName];

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

/**
 * Return the post which matches the id provided
 *
 * @param {object} state current state
 * @param {string} id post id
 */
export const selectCurrentUserPost = (state, id) => state.currentUserReducer.posts[id];

/**
 * Return a boolean which represents the loading state of currentUserReducer
 *
 * @param {object} state current state
 */
export const selectCurrentUserLoading = (state) => state.currentUserReducer.loading;

/**
 * Return a boolean which represents the createAccountSuccess status
 *
 * @param {object} state current state
 */
export const selectCreateAccountSuccess = (state) => state.currentUserReducer.createAccountSuccess;
