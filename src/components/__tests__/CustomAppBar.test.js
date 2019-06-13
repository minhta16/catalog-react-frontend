/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { CustomAppBar } from 'components/CustomAppBar';
import LoginButton from 'components/LoginButton';
import LoginDialog from 'components/LoginDialog';

describe('components/CustomAppBar', () => {
  let wrapper;
  let props;
  // let warning;

  const update = () => {
    wrapper.update();
    wrapper.instance().forceUpdate();
  };

  const setup = () => {
    wrapper = shallow(<CustomAppBar {...props} />);
  };

  beforeEach(() => {
    props = {
      color: 'primary',
      signIn: jest.fn(),
      signOut: jest.fn(),
      currentUser: {
        username: 'minh',
        password: 'minh',
        token: 'abc',
      },
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleLoginClick when LoginButton is clicked', () => {
    setup();
    wrapper.instance().handleLoginClick = jest.fn();
    update();
    const loginButton = wrapper.find(LoginButton);
    loginButton.simulate('click');
    expect(wrapper.instance().handleLoginClick).toHaveBeenCalled();
  });

  it('should call signIn when Dialog is clicked', () => {
    setup();
    const { signIn } = props;
    const loginDialog = wrapper.find(LoginDialog);
    loginDialog.simulate('click');
    expect(signIn).toHaveBeenCalled();
  });

  it('should update state.open when handleLoginClick is called', () => {
    setup();
    const { open } = wrapper.state();
    const loginButton = wrapper.find(LoginButton);
    loginButton.simulate('click');
    expect(wrapper.state().open).toBe(!open);
  });
});
