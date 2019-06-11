/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import LoginDialog from 'components/LoginDialog';
import { TextField } from '@material-ui/core';

describe('components/LoginDialog', () => {
  let wrapper;
  let props;
  // let warning;

  const setup = () => {
    wrapper = shallow(<LoginDialog {...props} />);
  };

  beforeEach(() => {
    props = {
      open: true,
      onClose: jest.fn(),
      onClick: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain 2 TextFields', () => {
    setup();
    expect(wrapper.find(TextField).length).toBe(2);
  });

  it('should call onClickSubmit calls onClick and onClose', () => {
    setup();
    const { onClick, onClose } = props;
    wrapper.instance().onClickSubmit();
    expect(onClick).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when cancel is clicked', () => {
    setup();
    const { onClose } = props;
    const cancelButton = wrapper.find('#login-dialog-close');
    cancelButton.simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should setState when a textfield is modified', () => {
    setup();
    const usernameText = wrapper.find('#username');
    usernameText.simulate('change', { target: { id: 'username', value: 'yolo' } });
    expect(wrapper.state().username).toBe('yolo');
  });
});
