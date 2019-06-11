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

  const accessToken = await fetch(`${process.env.REACT_APP_API_PATH}/auth`, params)
    .then((res) => res.json())
    .then((data) => data.access_token)
    .catch(console.log);
  return accessToken;
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

  await fetch(`${process.env.REACT_APP_API_PATH}/users`, params)
    .then((res) => res.json())
    .then((data) => data.access_token)
    .catch(console.log);

  const accessToken = signInApi(username, password);
  return accessToken;
};

export const createApiCategories = (category, token) => {
  const params = {
    headers: {
      Authorization: `JWT ${token}`,
      'content-type': 'application/json',
    },
    body: category,
    method: 'POST',
  };
  fetch(`${process.env.REACT_APP_API_PATH}/categories/`, params);
};

// not working yet
export const fetchApiUsers = async () => {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };

  const fetchedItems = await fetch(
    `${process.env.REACT_APP_API_PATH}/categories//items?offset=0&limit=100`,
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
