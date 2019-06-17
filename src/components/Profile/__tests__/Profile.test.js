/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../Profile';

describe('components/PostItem', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<Profile {...props} />);
  };

  beforeEach(() => {
    props = {
      currentUser: {
        username: 'minh',
        token: 'minh',
      },
      fetchCurrentUserPost: jest.fn(),
      currentUserPosts: [{ name: 'meo', description: 'meo' }],
      currentUserLoading: false,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchCurrentuserPost at mount', () => {
    setup();
    expect(props.fetchCurrentUserPost).toHaveBeenCalled();
  });
});
