class Posts {
  ADD_POST = 'ADD_POST';

  FETCH_POSTS = 'FETCH_POSTS';
}

class Categories {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES';

  ADD_CATEGORY = 'ADD_CATEGORY';
}

class Users {
  FETCH_USERS = 'FETCH_USERS';

  FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';

  SIGN_IN = 'SIGN_IN';

  SIGN_OUT = 'SIGN_OUT';

  FETCH_CURRENT_USER_POST = 'FETCH_CURRENT_USER_POST';

  AUTH_ERROR = 'AUTH_ERROR';
}

export const PostsType = new Posts();
export const CategoriesType = new Categories();
export const UsersType = new Users();
