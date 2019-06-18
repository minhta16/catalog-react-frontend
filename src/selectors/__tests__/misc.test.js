/* eslint-disable no-undef */
import { selectMiscSnackbarOpen, selectMiscSnackbarMessage } from '../misc';

describe('selectors/misc', () => {
  let state;
  beforeEach(() => {
    state = {
      miscReducer: {
        snackbar: {
          open: false,
          message: '',
        },
      },
    };
  });

  it('should select the correct snackbar open', () => {
    expect(selectMiscSnackbarOpen(state)).toEqual(false);
  });

  it('should select the correct snackbar message', () => {
    expect(selectMiscSnackbarMessage(state)).toEqual('');
  });
});
