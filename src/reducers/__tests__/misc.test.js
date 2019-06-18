/* eslint-disable no-undef */
import miscReducer from '../misc';
import { MiscType } from '../../actions/types';

describe('reducer/misc', () => {
  it('should return the initial state', () => {
    expect(miscReducer(undefined, {})).toEqual({ snackbar: { open: false, message: '' } });
  });

  it('should return loading and message with OPEN_SNACKBAR', () => {
    const action = {
      type: MiscType.OPEN_SNACKBAR,
      payload: 'meomeo',
    };
    expect(miscReducer({}, action)).toEqual({ snackbar: { open: true, message: 'meomeo' } });
  });

  it('should return not loading and empty message with CLOSE_SNACKBAR', () => {
    const action = {
      type: MiscType.CLOSE_SNACKBAR,
    };
    expect(miscReducer({}, action)).toEqual({ snackbar: { open: false, message: '' } });
  });
});
