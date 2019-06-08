import Home from 'views/Home';

const routes = [
  {
    path: '/',
    view: Home,
    exact: true,
  },
  {
    path: '/:id',
    view: Home,
    exact: true,
  },
];

export default routes;
