import Home from 'views/Home';

const routes = [
  {
    path: '/',
    view: Home,
    exact: true,
  },
  {
    path: '/:categoryName',
    view: Home,
    exact: false,
  },
];

export default routes;
