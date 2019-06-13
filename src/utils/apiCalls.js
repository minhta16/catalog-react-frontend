export const fetchApiCategories = async () => {
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
    .then((res) => res.json())
    .then((data) => {
      let returnData = {};
      data.categories.forEach((category) => {
        returnData = { ...returnData, [category.id]: category };
      });
      return returnData;
    })
    .catch(console.log);
  return fetchedData;
};

export const fetchApiItems = async (categoryId) => {
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
    .then((res) => res.json())
    .then((data) => {
      let returnData = {};
      data.items.forEach((item) => {
        returnData = { ...returnData, [item.id]: item };
      });
      return returnData;
    })
    .catch(console.log);
  return fetchedItems;
};

export const signInApi = async (username, password) => {
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

  const userData = await fetch(`${process.env.REACT_APP_API_PATH}/auth`, params)
    .then((res) => res.json())
    .catch(console.log);
  return userData;
};

export const createUserAndSigninApi = async (username, password, email, name) => {
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

  const userData = await fetch(`${process.env.REACT_APP_API_PATH}/users`, params)
    .then(() => signInApi(username, password))
    .catch(console.log);

  return userData;
};

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

export const fetchCurrentUserPostsApi = async (token) => {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    method: 'GET',
  };

  const fetchedItems = await fetch(`${process.env.REACT_APP_API_PATH}/me/post`, params)
    .then((res) => res.json())
    .catch(console.log);
  return fetchedItems;
};

export const deletePostApi = async (token, categoryId, postId) => {
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
  )
    .then((res) => res.json())
    .catch(console.log);
  return message;
};
