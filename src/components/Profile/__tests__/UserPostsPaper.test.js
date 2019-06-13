/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
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
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
