export const actionNameUtil = {
  createRequest: (actionName) => `${actionName}_REQUEST`,
  createSuccess: (actionName) => `${actionName}_SUCCESS`,
  createFailure: (actionName) => `${actionName}_FAILURE`,
};

const automateAsyncAction = (store) => (next) => (action) => {
  if (!Object.prototype.hasOwnProperty.call(action, 'promise')) {
    return next(action);
  }
  const { type, promise } = action;
  Promise.resolve(1).then(() => store.dispatch({ type: actionNameUtil.createRequest(type) }));
  promise
    .then((data) =>
      store.dispatch({
        type: actionNameUtil.createSuccess(type),
        payload: data,
      }),
    )
    .catch((err) => {
      Promise.resolve(1).then(() =>
        store.dispatch({
          type: actionNameUtil.createFailure(type),
          payload: {
            name: err.name,
            message: err.message,
          },
        }),
      );
    });
  return next(action);
};

export default automateAsyncAction;
