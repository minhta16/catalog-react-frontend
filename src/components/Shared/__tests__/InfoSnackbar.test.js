/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { InfoSnackbar } from 'components/Shared/InfoSnackbar';

describe('components/LoginDialog', () => {
  let wrapper;
  let props;
  // let warning;

  const setup = () => {
    wrapper = shallow(<InfoSnackbar {...props} />);
  };

  beforeEach(() => {
    props = {
      open: true,
      onClose: jest.fn(),
      message: 'message',
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call default onClose correctly', () => {
    setup();
    expect(InfoSnackbar.defaultProps.onClose).toBeDefined();
    expect(InfoSnackbar.defaultProps.onClose()).toBe(undefined);
  });
});
