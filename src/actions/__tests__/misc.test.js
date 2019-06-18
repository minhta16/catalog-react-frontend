/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { openSnackbar, closeSnackbar } from '../misc';
import { MiscType } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions/categories', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });
  it('should create OPEN_SNACKBAR when openSnackbar()', async () => {
    store.dispatch(openSnackbar('meomeo'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: MiscType.OPEN_SNACKBAR,
      payload: 'meomeo',
    });
  });

  it('should create CLOSE_SNACKBAR when closeSnackbar()', async () => {
    store.dispatch(closeSnackbar());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: MiscType.CLOSE_SNACKBAR,
    });
  });
});
