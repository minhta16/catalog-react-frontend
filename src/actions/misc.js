import { MiscType } from './types';

export const openSnackbar = (message) => ({
  type: MiscType.OPEN_SNACKBAR,
  payload: message,
});

export const closeSnackbar = () => ({
  type: MiscType.CLOSE_SNACKBAR,
});
