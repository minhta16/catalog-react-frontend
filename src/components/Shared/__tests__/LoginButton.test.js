/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from 'components/Shared/LoginButton';
import { Avatar, Menu } from '@material-ui/core';

describe('components/LoginButton', () => {
  let wrapper;
  let props;
  // let warning;

  const update = () => {
    wrapper.update();
    wrapper.instance().forceUpdate();
  };

  const setup = () => {
    wrapper = shallow(<LoginButton {...props} />);
  };

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      signOut: jest.fn(),
      currentUser: {
        username: 'yolo',
        token: 'motconvitxoera2caicanh',
      },
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call signOut and handleClsoeMenu when Log out button is clicked', () => {
    setup();
    wrapper.instance().handleCloseMenu = jest.fn();
    update();
    const logout = wrapper.find('#login-button-logout');
    logout.simulate('click');
    expect(props.signOut).toHaveBeenCalled();
    expect(wrapper.instance().handleCloseMenu).toHaveBeenCalled();
  });

  it('should call handleClickAvatar when avatar is clicked', () => {
    setup();
    wrapper.instance().handleClickAvatar = jest.fn();
    update();
    const avatar = wrapper.find(Avatar);
    avatar.simulate('click');
    expect(wrapper.instance().handleClickAvatar).toHaveBeenCalled();
  });

  it('should call handleCloseMenu when menu is closed', () => {
    setup();
    wrapper.instance().handleCloseMenu = jest.fn();
    update();
    const avatar = wrapper.find(Menu);
    avatar.simulate('close');
    expect(wrapper.instance().handleCloseMenu).toHaveBeenCalled();
  });

  it('should update anchorEl when handleClickAvatar is called', () => {
    setup();
    wrapper.instance().handleClickAvatar({ target: 'meow' });
    expect(wrapper.state().anchorEl).toBe('meow');
  });

  it('should set anchorEl to undefined when handleCloseMenu is called', () => {
    setup();
    wrapper.instance().handleCloseMenu();
    expect(wrapper.state().anchorEl).toBe(undefined);
  });

  it('should show login button when currentUser is not present', () => {
    props.currentUser = {};
    setup();
    expect(wrapper.find('#login-button').length).toBe(1);
  });
});
