/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from 'components/SignUp/SignUp';
import { Redirect } from 'react-router-dom';

describe('components/SignUp/SignUp', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<SignUp {...props} />);
  };

  const update = () => {
    wrapper.update();
    wrapper.instance().forceUpdate();
  };

  beforeEach(() => {
    props = {
      createUser: jest.fn(),
      clearError: jest.fn(),
      createAccountSuccess: false,
      signIn: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleTermsClick when click Terms and Condition', () => {
    setup();
    jest.spyOn(wrapper.instance(), 'handleTermsClick');
    update();
    const link = wrapper.find('#sign-up-terms-and-condition');
    link.simulate('click');
    expect(wrapper.instance().handleTermsClick).toHaveBeenCalled();
  });

  it('should call handleChange when a textfield is changed', () => {
    setup();
    jest.spyOn(wrapper.instance(), 'handleChange');
    update();
    const textField = wrapper.find('#username');
    textField.simulate('change', {
      target: {
        id: 'username',
        value: 'lol',
      },
    });
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
  });

  it('should contain a redirect with createAccountSuccess', () => {
    props.createAccountSuccess = true;
    setup();
    expect(wrapper.find(Redirect).length).toBe(1);
  });

  it('should display errors when errorMessage is viable', () => {
    props.errorMessage = ['meomeo', 'row fow'];
    setup();
    expect(wrapper.find('[color="error"]').length).toBe(2);
  });

  // it('should display error if emailWarning', () => {
  //   setup();
  //   wrapper.setState({
  //     emailWarning: true,
  //   });
  //   expect(wrapper.find("#email").)
  // })

  describe('register() is called', () => {
    it('should call createUser and set redirect when password is qualified', () => {
      setup();
      wrapper.setState({
        passwordMatchWarning: false,
        passWarning: false,
      });
      wrapper.instance().register({ preventDefault: jest.fn() });
      expect(props.createUser).toHaveBeenCalled();
    });

    it('should not do anything when password is not qualified', () => {
      setup();
      wrapper.setState({
        passwordMatchWarning: true,
        passWarning: true,
      });
      wrapper.instance().register({ preventDefault: jest.fn() });
      expect(props.createUser).not.toHaveBeenCalled();
    });
  });

  describe('qualifiedPassword() is called', () => {
    it('should return false with unqualified passwords', () => {
      setup();
      const { qualifiedPassword } = wrapper.instance();
      expect(qualifiedPassword('a')).toBe(false);
      expect(qualifiedPassword('azzzzzzzzzz')).toBe(false);
      expect(qualifiedPassword('123123123123')).toBe(false);
    });
    it('should return true with qualified passwords and empty password', () => {
      setup();
      const { qualifiedPassword } = wrapper.instance();
      expect(qualifiedPassword('SuperSonic99')).toBe(true);
      expect(qualifiedPassword('')).toBe(true);
    });
  });

  describe('qualifiedEmail() is called', () => {
    it('should return false with unqualified passwords', () => {
      setup();
      const { qualifiedEmail } = wrapper.instance();
      expect(qualifiedEmail('a')).toBe(false);
      expect(qualifiedEmail('azzzzzzzzzz')).toBe(false);
      expect(qualifiedEmail('123123123123')).toBe(false);
      expect(qualifiedEmail('123123123123@123.com')).toBe(false);
      expect(qualifiedEmail('minh@minh.123')).toBe(false);
    });
    it('should return true with qualified passwords and empty password', () => {
      setup();
      const { qualifiedEmail } = wrapper.instance();
      expect(qualifiedEmail('SuperSonic99@gmail.com')).toBe(true);
      expect(qualifiedEmail('normal@sample.com')).toBe(true);
    });
  });
});
