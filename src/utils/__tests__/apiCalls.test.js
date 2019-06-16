/* eslint-disable no-undef */
import api from '../apiCalls';

describe('utils/apiCalls', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call handleError correctly', async () => {
    expect(
      await api
        .handleError('error')
        .then(() => 'then')
        .catch(() => 'catch'),
    ).toBe('catch');
  });

  describe('fetchApiCategories', () => {
    it('should return data', () => {
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
      api.fetchCategories().then((res) => {
        expect(Object.keys(res).length).toBe(3);
      });
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toBe(
        `${process.env.REACT_APP_API_PATH}/categories?offset=0&limit=100`,
      );
    });

    it('should return error promise if it has an error', () => {
      fetch.mockResponse(
        JSON.stringify({
          ok: false,
          error: new Error('Broke'),
        }),
      );
      expect(api.fetchCategories()).rejects.toEqual(
        new TypeError("Cannot read property 'forEach' of undefined"),
      );
    });
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
    api.fetchItems(1).then((res) => {
      expect(Object.keys(res).length).toBe(2);
    });
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
    api.signIn('meo', 'meo').then((res) => {
      expect(res).toMatchObject(response);
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/auth`);
  });

  it('should call createUser correctly', () => {
    const response = {
      access_token: 'abc',
    };
    fetch.mockResponse(JSON.stringify(response));
    api.createUser('meo', 'meo', 'meo', 'meo').then((res) => {
      expect(res).toMatchObject(response);
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/users`);
  });

  it('should call fetchCurrentUserPostsApi correctly', () => {
    const response = [
      {
        name: 'abc',
      },
      {
        name: 'meomeo',
      },
    ];
    fetch.mockResponse(JSON.stringify(response));
    api.fetchCurrentUserPosts('meomeo').then((res) => {
      expect(res).toMatchObject(response);
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/me/post`);
  });

  it('should call deletePostApi correctly', () => {
    const response = {
      message: 'post deleted',
    };
    fetch.mockResponse(JSON.stringify(response));
    api.deletePost('meomeo', 1, 2).then((res) => {
      expect(res).toMatchObject(response);
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/categories/1/items/2`);
  });

  it('should call addPostApi correctly', () => {
    const response = {
      message: 'mock',
    };
    fetch.mockResponse(JSON.stringify(response));
    api
      .addPost('meomeo', 1, {
        name: 'test',
        description: 'test',
        price: 0,
      })
      .then((res) => {
        expect(res).toMatchObject(response);
      });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/categories/1/items`);
  });

  it('should call modifyPostApi correctly', () => {
    const response = {
      message: 'mock',
    };
    fetch.mockResponse(JSON.stringify(response));
    api
      .modifyPost('meomeo', 1, 2, {
        name: 'test',
        description: 'test',
        price: 0,
      })
      .then((res) => {
        expect(res).toMatchObject(response);
      });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_PATH}/categories/1/items/2`);
  });
});
