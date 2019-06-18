import config from 'envConfig';

class ApiCalls {
  apiPath = config.API_ROOT;

  /**
   * create an api request which contains the following information:
   * method: POST, GET, DELETE
   * body:
   * accessToken: JWT token
   */
  fetchRequest = async (requestParams) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: requestParams.method,
      body: requestParams.body,
    };

    if (requestParams.accessToken) {
      params.headers.Authorization = `JWT ${requestParams.accessToken}`;
    }

    const data = await fetch(requestParams.path, params).then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    });

    return data;
  };

  /**
   * Fetch all categories
   */
  fetchCategories = () => {
    const fetchedData = this.fetchRequest({
      method: 'GET',
      path: `${this.apiPath}/categories?offset=0&limit=100`,
    }).then((data) => {
      if (data instanceof Promise) {
        return data;
      }
      let returnData = {};
      data.categories.forEach((category) => {
        returnData = { ...returnData, [category.id]: category };
      });
      return returnData;
    });
    return fetchedData;
  };

  /**
   * Fetch all items in a category, given the categoryId
   */
  fetchItems = (categoryId) => {
    const fetchedItems = this.fetchRequest({
      method: 'GET',
      path: `${this.apiPath}/categories/${categoryId}/items?offset=0&limit=100`,
    }).then((data) => {
      if (data instanceof Promise) {
        return data;
      }
      let returnData = {};
      data.items.forEach((category) => {
        returnData = { ...returnData, [category.id]: category };
      });
      return returnData;
    });
    return fetchedItems;
  };

  /**
   * Sign in and get a user token
   */
  signIn = (username, password) => {
    const userData = this.fetchRequest({
      method: 'POST',
      path: `${this.apiPath}/auth`,
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return userData;
  };

  /**
   * Create a new user in the database
   */
  createUser = (username, password, email, name) => {
    const userData = this.fetchRequest({
      method: 'POST',
      path: `${this.apiPath}/users`,
      body: JSON.stringify({
        username,
        password,
        email,
        name,
      }),
    });
    return userData;
  };

  /**
   * Fetch posts from the current user
   */
  fetchCurrentUserPosts = (token) => {
    const fetchedItems = this.fetchRequest({
      method: 'GET',
      path: `${this.apiPath}/me/post`,
      accessToken: token,
    });
    return fetchedItems;
  };

  /**
   * Delete post of the current user
   */
  deletePost = (token, categoryId, postId) => {
    const message = this.fetchRequest({
      method: 'DELETE',
      path: `${this.apiPath}/categories/${categoryId}/items/${postId}`,
      accessToken: token,
    });
    return message;
  };

  /**
   * Add a post, given the current user token and categoryId that need to be added to
   */
  addPost = (token, categoryId, post) => {
    const message = this.fetchRequest({
      method: 'POST',
      path: `${this.apiPath}/categories/${categoryId}/items`,
      accessToken: token,
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    });
    return message;
  };

  /**
   * Modify a post, given the categoryId and itemId of that post
   */
  modifyPost = (token, categoryId, itemId, post) => {
    const message = this.fetchRequest({
      method: 'PUT',
      path: `${this.apiPath}/categories/${categoryId}/items/${itemId}`,
      accessToken: token,
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    });
    return message;
  };
}

export default new ApiCalls();
// export const createApiCategories = (category, token) => {
//   const params = {
//     headers: {
//       Authorization: `JWT ${token}`,
//       'content-type': 'application/json',
//     },
//     body: category,
//     method: 'POST',
//   };
//   fetch(`${this.apiPath}/categories/`, params);
// };
