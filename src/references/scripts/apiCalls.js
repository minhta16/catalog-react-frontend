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
    .then(res => res.json())
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
    .then(res => res.json())
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
