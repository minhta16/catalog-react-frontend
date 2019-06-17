/* eslint-disable no-undef */
import {
  loadCurrentUser,
  saveCurrentUser,
  loadCategories,
  saveCategories,
  loadPosts,
  savePosts,
} from '../localStorage';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('src/localStorage', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  describe('loadCurrentUser', () => {
    it('should return undefined if an error is thrown', () => {
      expect(loadCurrentUser()).toBe(undefined);
    });
  });

  it('should save user correctly', () => {
    const user = {
      username: 'minh',
      token: 'motconvit',
      posts: [],
    };
    saveCurrentUser(user);
    expect(loadCurrentUser()).toMatchObject(user);
  });

  describe('loadCategories', () => {
    it('should return undefined if an error is thrown', () => {
      expect(loadCategories()).toBe(undefined);
    });
  });

  it('should save categories correctly', () => {
    const categories = {
      1: { name: 'meo' },
      2: {
        name: 'meo',
      },
    };
    saveCategories(categories);
    expect(loadCategories()).toMatchObject(categories);
  });

  describe('loadPosts', () => {
    it('should return undefined if an error is thrown', () => {
      expect(loadPosts()).toBe(undefined);
    });
  });

  it('should save posts correctly', () => {
    const posts = {
      1: { name: 'meo' },
      2: {
        name: 'meo',
      },
    };
    savePosts(posts);
    expect(loadPosts()).toMatchObject(posts);
  });
});
