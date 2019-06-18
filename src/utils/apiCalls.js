import config from 'config';

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
  fetchCategories = () =>
    this.fetchRequest({
      method: 'GET',
      path: `${this.apiPath}/categories?offset=0&limit=100`,
    }).then((data) => {
      let returnData = {};
      data.categories.forEach((category) => {
        returnData = { ...returnData, [category.id]: category };
      });
      return returnData;
    });

  /**
   * Fetch all items in a category, given the categoryId
   */
  fetchItems = (categoryId) =>
    this.fetchRequest({
      method: 'GET',
      path: `${this.apiPath}/categories/${categoryId}/items?offset=0&limit=100`,
    }).then((data) => {
      let returnData = {};
      data.items.forEach((category) => {
        returnData = { ...returnData, [category.id]: category };
      });
      return returnData;
    });

  /**
   * Sign in and get a user token
   */
  signIn = (username, password) =>
    this.fetchRequest({
      method: 'POST',
      path: `${this.apiPath}/auth`,
      body: JSON.stringify({
        username,
        password,
      }),
    });

  /**
   * Create a new user in the database
   */
  createUser = (username, password, email, name) =>
    this.fetchRequest({
      method: 'POST',
      path: `${this.apiPath}/users`,
      body: JSON.stringify({
        username,
        password,
        email,
        name,
      }),
    });

  /**
   * Fetch posts from the current user
   */
  fetchCurrentUserPosts = (token) =>
    this.fetchRequest({
      method: 'GET',
      path: `${this.apiPath}/me/post`,
      accessToken: token,
    });

  /**
   * Delete post of the current user
   */
  deletePost = (token, categoryId, postId) =>
    this.fetchRequest({
      method: 'DELETE',
      path: `${this.apiPath}/categories/${categoryId}/items/${postId}`,
      accessToken: token,
    });

  /**
   * Add a post, given the current user token and categoryId that need to be added to
   */
  addPost = (token, categoryId, post) =>
    this.fetchRequest({
      method: 'POST',
      path: `${this.apiPath}/categories/${categoryId}/items`,
      accessToken: token,
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    });

  /**
   * Modify a post, given the categoryId and itemId of that post
   */
  modifyPost = (token, categoryId, itemId, post) =>
    this.fetchRequest({
      method: 'PUT',
      path: `${this.apiPath}/categories/${categoryId}/items/${itemId}`,
      accessToken: token,
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    });
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
