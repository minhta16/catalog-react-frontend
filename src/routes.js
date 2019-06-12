import Home from 'views/Home';
import Post from 'views/Post';
import SignUp from 'views/SignUp';
import Profile from 'views/Profile';

const routes = [
  {
    path: '/',
    view: Home,
    exact: true,
  },
  {
    path: '/register',
    view: SignUp,
    exact: true,
  },
  {
    path: '/profile',
    view: Profile,
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
