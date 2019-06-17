/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { CircularProgress } from '@material-ui/core';
import { UserPostsPaper } from '../UserPostsPaper';

describe('components/PostItem', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<UserPostsPaper {...props} />);
  };

  beforeEach(() => {
    props = {
      username: 'minh',
      posts: [{ name: 'meo', description: 'meo' }],
      loading: false,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display CircularProgress if loading is true', () => {
    props.loading = true;
    setup();
    expect(wrapper.find(CircularProgress).length).toBe(1);
  });

  it('should not display CircularProgress if loading is true', () => {
    props.loading = false;
    setup();
    expect(wrapper.find(CircularProgress).length).toBe(0);
  });
});
