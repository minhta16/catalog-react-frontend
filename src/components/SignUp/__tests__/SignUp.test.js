/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from 'components/SignUp/SignUp';

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
      createUserAndSignIn: jest.fn(),
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

  // it('should display error if emailWarning', () => {
  //   setup();
  //   wrapper.setState({
  //     emailWarning: true,
  //   });
  //   expect(wrapper.find("#email").)
  // })

  describe('register() is called', () => {
    it('should call createUserAndSignIn and set redirect when password is qualified', () => {
      setup();
      wrapper.setState({
        passwordMatchWarning: false,
        passWarning: false,
      });
      wrapper.instance().register();
      expect(props.createUserAndSignIn).toHaveBeenCalled();
      expect(wrapper.state().redirect).toBe(true);
    });

    it('should not do anything when password is not qualified', () => {
      setup();
      wrapper.setState({
        passwordMatchWarning: true,
        passWarning: true,
      });
      wrapper.instance().register();
      expect(props.createUserAndSignIn).not.toHaveBeenCalled();
      expect(wrapper.state().redirect).toBe(false);
    });
  });

  describe('qualifiedPassword() is called', () => {
    it('should return false with unqualified passwords', () => {
      setup();
      const { qualifiedPassword } = wrapper.instance();
      expect(qualifiedPassword('a')).toBe(false);
      expect(qualifiedPassword('azzzzzzzzzz')).toBe(false);
      expect(qualifiedPassword('123123123123')).toBe(false);
      expect(qualifiedPassword('')).toBe(false);
    });
    it('should return true with qualified passwords', () => {
      setup();
      const { qualifiedPassword } = wrapper.instance();
      expect(qualifiedPassword('SuperSonic99')).toBe(true);
    });
  });
});
