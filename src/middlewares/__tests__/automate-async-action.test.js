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
        expect(actions[0]).toEqual({
          type: 'EAT_PIZZA_REQUEST',
        });
        expect(actions[1]).toEqual({
          type: 'EAT_PIZZA_SUCCESS',
          payload: 'meomeo',
        });
      });
    });

    it('should return correctly if Promise is rejected', () => {
      const action = {
        type: 'EAT_PIZZA',
        // eslint-disable-next-line prefer-promise-reject-errors
        promise: Promise.reject(
          Promise.resolve({
            message: { 1: ['meomeo'] },
          }),
        ),
      };
      store.dispatch(action);
      Promise.resolve().catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'EAT_PIZZA_REQUEST',
        });
        expect(actions[1]).toEqual({
          type: 'EAT_PIZZA_FAILURE',
          payload: { message: ['meomeo'] },
        });
      });
    });

    it('should return correctly if Promise is rejected with default error type', () => {
      const action = {
        type: 'EAT_PIZZA',
        // eslint-disable-next-line prefer-promise-reject-errors
        promise: Promise.reject(
          Promise.resolve({
            description: 'meomeo',
          }),
        ),
      };
      store.dispatch(action);
      Promise.resolve().catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'EAT_PIZZA_REQUEST',
        });
        expect(actions[1]).toEqual({
          type: 'EAT_PIZZA_FAILURE',
          payload: { message: ['meomeo'] },
        });
      });
    });
  });
});
