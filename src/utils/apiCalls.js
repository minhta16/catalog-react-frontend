class ApiCalls {
  handleError = (err) =>
    new Promise((_resolve, reject) => {
      reject(err);
    });

  fetchRequest = (requestParams) => {
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

    const data = fetch(requestParams.path, params).then((res) => {
      if (!res.ok) return this.handleError(res);
      return res.json();
    });

    return data;
  };

  fetchCategories = async () => {
    const fetchedData = await this.fetchRequest({
      method: 'GET',
      path: `${process.env.REACT_APP_API_PATH}/categories?offset=0&limit=100`,
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

  fetchItems = async (categoryId) => {
    const fetchedItems = await this.fetchRequest({
      method: 'GET',
      path: `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items?offset=0&limit=100`,
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

  signIn = async (username, password) => {
    const userData = await this.fetchRequest(
      'POST',
      `${process.env.REACT_APP_API_PATH}/auth`,
      JSON.stringify({
        username,
        password,
      }),
    );
    return userData;
  };

  createUser = async (username, password, email, name) => {
    const userData = await this.fetchRequest({
      method: 'POST',
      path: `${process.env.REACT_APP_API_PATH}/users`,
      body: JSON.stringify({
        username,
        password,
        email,
        name,
      }),
    });
    return userData;
  };

  fetchCurrentUserPosts = async (token) => {
    const fetchedItems = await this.fetchRequest({
      method: 'GET',
      path: `${process.env.REACT_APP_API_PATH}/me/post`,
      accessToken: token,
    });
    return fetchedItems;
  };

  deletePost = async (token, categoryId, postId) => {
    const message = await this.fetchRequest({
      method: 'DELETE',
      path: `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items/${postId}`,
      accessToken: token,
    });
    return message;
  };

  addPost = async (token, categoryId, post) => {
    const message = await this.fetchRequest({
      method: 'POST',
      path: `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items`,
      accessToken: token,
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    });
    return message;
  };

  modifyPost = async (token, categoryId, itemId, post) => {
    const message = await this.fetchRequest({
      method: 'PUT',
      path: `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items/${itemId}`,
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
//   fetch(`${process.env.REACT_APP_API_PATH}/categories/`, params);
// };
