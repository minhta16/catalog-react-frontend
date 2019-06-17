/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';

describe('views/Home', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  // };

  const setup = () => {
    wrapper = shallow(<Home {...props} />);
  };

  beforeEach(() => {
    props = {
      fetchCategories: jest.fn(),
      match: {
        params: {
          id: '1',
        },
      },
      location: {
        snackbarMess: 'true',
      },
      fetchPosts: jest.fn(),
      categories: [
        {
          created: '2019',
          updated: '2019',
          description: 'testDesc',
          name: 'testName',
          id: '1',
        },
      ],
      selectedCatItems: [],
      categoriesLoading: false,
      postsLoading: false,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('When view mounts', () => {
    it('should not call fetchPosts if id is blank', () => {
      props.match.params.id = '';
      setup();
      expect(props.fetchPosts).not.toHaveBeenCalled();
    });

    it('should call fetchPosts if id is something', () => {
      setup();
      expect(props.fetchPosts).toHaveBeenCalled();
    });

    it('should close snackbar if snackbarMess is not present', () => {
      props.location.snackbarMess = '';
      setup();
      expect(wrapper.state().openSnackbar).toBe(false);
    });

    it('should open snackbar if snackbarMess is present', () => {
      props.location.snackbarMess = 'This is the message';
      setup();
      expect(wrapper.state().openSnackbar).toBe(true);
    });
  });
});
