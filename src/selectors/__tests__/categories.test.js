/* eslint-disable no-undef */
import { selectCategories, selectCategory, selectCategoriesLoading } from '../categories';

describe('selectors/categories', () => {
  let state;
  beforeEach(() => {
    state = {
      categoriesReducer: {
        categories: {
          1: {
            name: 'yo',
            id: '1',
          },
          2: {
            name: 'bro',
            id: '2',
          },
        },
        loading: true,
      },
    };
  });
  it('should select the correct categories', () => {
    const categories = [{ name: 'yo', id: '1' }, { name: 'bro', id: '2' }];
    expect(selectCategories(state)).toMatchObject(categories);
  });

  it('should select the correct category', () => {
    const category = { name: 'yo', id: '1' };
    expect(selectCategory(state, 1)).toMatchObject(category);
  });

  it('should select the correct loading', () => {
    expect(selectCategoriesLoading(state)).toBe(true);
  });
});
