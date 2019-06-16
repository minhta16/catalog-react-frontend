/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { CustomAppBar } from 'components/Shared/CustomAppBar';
import LoginButton from 'components/Shared/LoginButton';
import LoginDialog from 'components/Shared/LoginDialog';

describe('components/Shared/CustomAppBar', () => {
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
      errorMessage: '',
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle handleOpenDialog() correctly', () => {
    setup();
    wrapper.instance().handleOpenDialog();
    expect(wrapper.state().open).toBe(true);
  });

  it('should handle handleCloseDialog() correctly', () => {
    setup();
    wrapper.instance().handleCloseDialog();
    expect(wrapper.state().open).toBe(false);
  });

  it('should call signIn when Dialog is clicked', () => {
    setup();
    const { signIn } = props;
    const loginDialog = wrapper.find(LoginDialog);
    loginDialog.simulate('click');
    expect(signIn).toHaveBeenCalled();
  });

  it('should handle componentDidUpdate correctly', () => {
    props.currentUser.token = 'meomeo';
    setup();
    wrapper.instance().handleCloseDialog = jest.fn();
    update();

    wrapper.instance().componentDidUpdate({
      currentUser: {
        token: 'still meomeo',
      },
    });
    expect(wrapper.instance().handleCloseDialog).not.toHaveBeenCalled();

    wrapper.instance().componentDidUpdate({
      currentUser: {
        token: '',
      },
    });
    expect(wrapper.instance().handleCloseDialog).toHaveBeenCalled();
  });

  it('should update state.open when handleLoginClick is called', () => {
    setup();
    const { open } = wrapper.state();
    const loginButton = wrapper.find(LoginButton);
    loginButton.simulate('click');
    expect(wrapper.state().open).toBe(!open);
  });
});
