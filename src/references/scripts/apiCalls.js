export const fetchApiCategories = () => {
  let returnData = {};
  fetch(`${process.env.API_PATH}/categories/`)
    .then(res => res.json())
    .then((data) => {
      returnData = data.categories;
    })
    .catch(console.log);
  return returnData;
};

export const fetchApiItems = (categoryId) => {
  let returnData = {};
  fetch(`${process.env.API_PATH}/categories/${categoryId}/items/`)
    .then(res => res.json())
    .then((data) => {
      returnData = data.items;
    })
    .catch(console.log);
  return returnData;
};
