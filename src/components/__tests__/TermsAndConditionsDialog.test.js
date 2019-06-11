/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { TermsAndConditionsDialog } from 'components/TermsAndConditionsDialog';
import { Button } from '@material-ui/core';

describe('components/TermsAndConditionsDialog', () => {
  let wrapper;
  let props;
  // let warning;

  const setup = () => {
    wrapper = shallow(<TermsAndConditionsDialog {...props} />);
  };

  beforeEach(() => {
    props = {
      open: true,
      onClose: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClose when click GotIt! button', () => {
    setup();
    const button = wrapper.find(Button);
    button.simulate('click');
    const { onClose } = props;
    expect(onClose).toHaveBeenCalled();
  });
});
