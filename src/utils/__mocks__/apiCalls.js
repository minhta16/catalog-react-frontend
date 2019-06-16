/* eslint-disable no-unused-vars */
class Api {
  responseCat = {
    total_categories: 100,
    categories: [
      {
        id: 21,
        name: 'category name',
        description: 'category description',
        created: '2015-08-05T08:40:51.620Z',
        updated: '2018-04-03T08:40:51.620Z',
      },
      {
        id: 22,
        name: 'category name',
        description: 'category description',
        created: '2015-08-05T08:40:51.620Z',
        updated: '2018-04-03T08:40:51.620Z',
      },
    ],
  };

  responseItems = {
    total_items: 100,
    items: [
      {
        id: 4,
        name: 'item name 1',
        description: 'item description 1',
        price: 30.5,
        user_id: 4,
        category_id: 2,
        created: '2015-08-05T08:40:51.620Z',
        updated: '2018-04-03T08:40:51.620Z',
      },
      {
        id: 8,
        name: 'item name 2',
        description: 'item description 2',
        price: 32.7,
        user_id: 18,
        category_id: 2,
        created: '2015-08-05T08:40:51.620Z',
        updated: '2018-04-03T08:40:51.620Z',
      },
    ],
  };

  responseItemsArr = [
    {
      id: 4,
      name: 'item name 1',
      description: 'item description 1',
      price: 30.5,
      user_id: 4,
      category_id: 2,
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
    {
      id: 8,
      name: 'item name 2',
      description: 'item description 2',
      price: 32.7,
      user_id: 18,
      category_id: 2,
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
  ];

  responseToken = {
    access_token: 'abc',
  };

  fetchCategories = () =>
    new Promise((resolve, reject) => {
      process.nextTick(() => resolve(this.responseCat));
    });

  fetchItems = (id) =>
    new Promise((resolve) => {
      process.nextTick(() => resolve(this.responseItems));
    });

  signIn = (username, password) =>
    new Promise((resolve, reject) => {
      process.nextTick(() =>
        username !== 'error'
          ? resolve(this.responseToken)
          : // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              ok: false,
            }),
      );
    });

  createUser = (username, name, email, password) =>
    new Promise((resolve) => {
      process.nextTick(() => resolve(this.responseToken));
    });

  fetchCurrentUserPosts = (token) =>
    new Promise((resolve) => {
      process.nextTick(() => resolve(this.responseItemsArr));
    });

  addPost = (token, categoryId, post) =>
    new Promise((resolve) => {
      process.nextTick(() =>
        resolve({
          message: 'meow',
        }),
      );
    });

  modifyPost = (token, categoryId, post) =>
    new Promise((resolve) => {
      process.nextTick(() =>
        resolve({
          message: 'meow',
        }),
      );
    });

  deletePost = (token, categoryId, postId) =>
    new Promise((resolve) => {
      process.nextTick(() => resolve(this.responseItemsArr));
    });
}

export default new Api();
