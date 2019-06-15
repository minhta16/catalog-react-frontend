export default (state) => (next) => (action) => {
  if (!Object.prototype.hasOwnProperty.call(action, 'async')) {
    return next(action);
  }
  return null;
};
