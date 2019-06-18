import { MiscType } from '../actions/types';

const initialState = {
  snackbar: {
    open: false,
    message: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MiscType.OPEN_SNACKBAR:
      return { ...state, snackbar: { open: true, message: action.payload } };
    case MiscType.CLOSE_SNACKBAR:
      return { ...state, snackbar: { open: false, message: '' } };
    default:
      return state;
  }
};
