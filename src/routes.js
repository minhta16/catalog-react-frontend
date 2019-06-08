import Home from 'views/Home';
import Post from 'views/Post';

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
  {
    path: '/:id/:postId',
    view: Post,
    exact: true,
  },
];

export default routes;
