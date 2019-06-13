/* eslint-disable no-undef */
import { fetchApiCategories, fetchApiItems, createUserAndSigninApi, signInApi } from '../apiCalls';

describe('scripts/apiCalls', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call fetchApiCategories correctly', () => {
    fetch.mockResponse(
      JSON.stringify({
        categories: [
          {
            id: '1',
            name: 'one',
            description: 'one',
          },
          {
            id: '2',
            name: 'two',
            description: 'two',
          },
          {
            id: '3',
            name: 'three',
            description: 'three',
          },
        ],
      }),
    );
    fetchApiCategories()
      .then((res) => {
        expect(Object.keys(res).length).toBe(3);
      })
      .catch(console.log);
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(
      `${process.env.REACT_APP_API_PATH}/categories?offset=0&limit=100`,
    );
  });

  it('should call fetchApiItems correctly', () => {
    fetch.mockResponse(
      JSON.stringify({
        items: [
          {
            id: '1',
            name: 'one',
            description: 'one',
          },
          {
            id: '2',
            name: 'two',
            description: 'two',
          },
        ],
      }),
    );
    fetchApiItems(1)
      .then((res) => {
        expect(Object.keys(res).length).toBe(2);
      })
      .catch(console.log);
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(
      `${process.env.REACT_APP_API_PATH}/categories/1/items?offset=0&limit=100`,
    );
  });

  it('should call signInApi correctly', () => {
    const response = {
      access_token: 'abc',
    };
    fetch.mockResponse(JSON.stringify(response));
    signInApi('meo', 'meo').then((res) => {
      expect(res).toMatchObject(response);
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/auth`);
  });

  it('should call createUserAndSigninApi correctly', () => {
    const response = {
      access_token: 'abc',
    };
    fetch.mockResponse(JSON.stringify(response));
    createUserAndSigninApi('meo', 'meo', 'meo', 'meo').then((res) => {
      expect(res).toMatchObject(response);
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/users`);
  });
});
