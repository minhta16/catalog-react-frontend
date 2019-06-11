/* eslint-disable no-undef */
import { selectCategories, selectCategory } from '../categories';

describe('selectors/categories', () => {
  let state;
  beforeEach(() => {
    state = {
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
});
