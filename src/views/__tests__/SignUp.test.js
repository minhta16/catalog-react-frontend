/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from 'views/SignUp';

describe('views/SignUp', () => {
  let wrapper;

  const setup = () => {
    wrapper = shallow(<SignUp />);
  };

  const update = () => {
    wrapper.update();
    wrapper.instance().forceUpdate();
  };

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
});
