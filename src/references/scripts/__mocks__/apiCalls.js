/* eslint-disable no-unused-vars */
export const responseCat = {
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
export const fetchApiCategories = () =>
  new Promise((resolve, reject) => {
    process.nextTick(() => resolve(responseCat));
  });

export const responseItems = {
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

export const fetchApiItems = (id) =>
  new Promise((resolve) => {
    process.nextTick(() => resolve(responseItems));
  });

export const responseToken = {
  access_token: 'abc',
};

export const signInApi = (username, password) =>
  new Promise((resolve) => {
    process.nextTick(() => resolve(responseToken));
  });

export const createUserAndSigninApi = (username, name, email, password) =>
  new Promise((resolve) => {
    process.nextTick(() => resolve(responseToken));
  });
