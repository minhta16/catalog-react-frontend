class ApiCalls {
  handleError = (err) =>
    new Promise((_resolve, reject) => {
      reject(err);
    });

  fetchCategories = async () => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    const fetchedData = await fetch(
      `${process.env.REACT_APP_API_PATH}/categories?offset=0&limit=100`,
      params,
    )
      .then((res) => {
        if (!res.ok) return this.handleError(res);
        return res.json();
      })
      .then((data) => {
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
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    const fetchedItems = await fetch(
      `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items?offset=0&limit=100`,
      params,
    )
      .then((res) => {
        if (!res.ok) return this.handleError(res);
        return res.json();
      })
      .then((data) => {
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
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const userData = await fetch(`${process.env.REACT_APP_API_PATH}/auth`, params).then((res) => {
      if (!res.ok) return this.handleError(res);
      return res.json();
    });
    return userData;
  };

  createUser = async (username, password, email, name) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        name,
      }),
    };

    const userData = await fetch(`${process.env.REACT_APP_API_PATH}/users`, params).then((res) => {
      if (!res.ok) return this.handleError(res);
      return res.json();
    });

    return userData;
  };

  fetchCurrentUserPosts = async (token) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      method: 'GET',
    };

    const fetchedItems = await fetch(`${process.env.REACT_APP_API_PATH}/me/post`, params).then(
      (res) => {
        if (!res.ok) return this.handleError(res);
        return res.json();
      },
    );
    return fetchedItems;
  };

  deletePost = async (token, categoryId, postId) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      method: 'DELETE',
    };

    const message = await fetch(
      `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items/${postId}`,
      params,
    ).then((res) => {
      if (!res.ok) return this.handleError(res);
      return res.json();
    });
    return message;
  };

  addPost = async (token, categoryId, post) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    };

    const message = await fetch(
      `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items`,
      params,
    ).then((res) => {
      if (!res.ok) return this.handleError(res);
      return res.json();
    });
    return message;
  };

  modifyPost = async (token, categoryId, itemId, post) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        price: post.price,
      }),
    };

    const message = await fetch(
      `${process.env.REACT_APP_API_PATH}/categories/${categoryId}/items/${itemId}`,
      params,
    ).then((res) => {
      if (!res.ok) return this.handleError(res);
      return res.json();
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
