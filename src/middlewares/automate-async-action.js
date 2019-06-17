export const actionNameUtil = {
  createRequest: (actionName) => `${actionName}_REQUEST`,
  createSuccess: (actionName) => `${actionName}_SUCCESS`,
  createFailure: (actionName) => `${actionName}_FAILURE`,
};

/**
 * A middleware which handles async api calls. This will automatically dispatch 3 actions: _REQUEST at first, _SUCCESS when success, and _FAIILURE when fail
 */
const automateAsyncAction = (store) => (next) => (action) => {
  // If action doesn't contain a promise attribute then skip
  if (!Object.prototype.hasOwnProperty.call(action, 'promise')) {
    return next(action);
  }
  const { type, promise, ...restAction } = action;
  // Dispatch the first action, _REQUEST
  store.dispatch({ type: actionNameUtil.createRequest(type) });
  return promise
    .then((data) =>
      // If promise resolves then dispatch _SUCCESS
      next({
        type: actionNameUtil.createSuccess(type),
        payload: data,
        ...restAction,
      }),
    )
    .catch((err) => {
      // If promise fails then dispatch _FAILURE
      return err.then((error) => {
        // This block is to handle mismatch error responses by the API
        let message = '';
        if (error.description) {
          message = [error.description];
        } else {
          message = Object.values(error.message);
        }
        // Return a _FAILURE, along with an error object which has the error message
        return next({
          type: actionNameUtil.createFailure(type),
          payload: {
            message,
          },
        });
      });
    });
};

export default automateAsyncAction;
