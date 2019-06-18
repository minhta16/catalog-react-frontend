import Home from 'components/Home/Home';
import Post from 'components/Post/Post';
import SignUp from 'components/SignUp/SignUp';
import Profile from 'components/Profile/Profile';
import ModifyItem from 'components/ModifyItem/ModifyItem';
import PageNotFound from 'components/Shared/PageNotFound';

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
    path: '/profile/:id/:postId/edit',
    view: ModifyItem,
    exact: true,
  },
  {
    path: '/new-item',
    view: ModifyItem,
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
  // Render 404 not found page
  {
    view: PageNotFound,
  },
];

export default routes;
