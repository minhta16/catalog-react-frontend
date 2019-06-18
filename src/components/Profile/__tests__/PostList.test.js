/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Typography } from '@material-ui/core';
import { PostList } from '../PostList';
import { PostItem } from '../PostItem';

describe('components/Profile/PostList', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<PostList {...props} />);
  };

  beforeEach(() => {
    props = {
      posts: [
        {
          name: 'bro',
          description: 'bro',
          category_id: '1',
          created: '2019',
          id: '1',
        },
      ],
      openSnackbar: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should prompt if user has no posts', () => {
    props.posts = [];
    setup();
    expect(wrapper.find(PostItem).length).toBe(0);
    expect(wrapper.find(Typography).length).toBe(2);
  });

  it('should call handleOpenSnackbar correctly', () => {
    setup();
    wrapper.instance().handleOpenSnackbar();
    expect(props.openSnackbar).toHaveBeenCalled();
  });
});
