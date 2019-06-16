/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import automateAsync, { actionNameUtil } from '../automate-async-action';

const middlewares = [thunk, automateAsync];
const mockStore = configureStore(middlewares);

describe('middlewares/automate-async-action', () => {
  const store = mockStore({});
  beforeEach(() => {
    store.clearActions();
  });
  describe('actionNameUtil', () => {
    it('should generate the correct action names', () => {
      const actionName = 'EAT_PIZZA';
      expect(actionNameUtil.createRequest(actionName)).toBe('EAT_PIZZA_REQUEST');
      expect(actionNameUtil.createSuccess(actionName)).toBe('EAT_PIZZA_SUCCESS');
      expect(actionNameUtil.createFailure(actionName)).toBe('EAT_PIZZA_FAILURE');
    });
  });

  describe('automateAsyncAction', () => {
    it('should return correctly if Promise is resolved', () => {
      const action = {
        type: 'EAT_PIZZA',
        promise: Promise.resolve('meomeo'),
      };
      store.dispatch(action);
      Promise.resolve().then(() => {
        const actions = store.getActions();
        expect(actions[1]).toEqual({
          type: 'EAT_PIZZA_REQUEST',
        });
        expect(actions[2]).toEqual({
          type: 'EAT_PIZZA_SUCCESS',
          payload: 'meomeo',
        });
      });
    });

    it('should return correctly if Promise is rejected', () => {
      const action = {
        type: 'EAT_PIZZA',
        promise: Promise.reject(new Error('meomeo')),
      };
      store.dispatch(action);
      Promise.resolve(1).catch(() => {
        const actions = store.getActions();
        expect(actions[1]).toEqual({
          type: 'EAT_PIZZA_REQUEST',
        });
        expect(actions[2]).toEqual({
          type: 'EAT_PIZZA_FAILURE',
          payload: { name: 'Error', message: 'meomeo' },
        });
      });
    });
  });
});
