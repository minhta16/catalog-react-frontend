/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import LoginDialog from 'components/Shared/LoginDialog';
import { TextField } from '@material-ui/core';

describe('components/Shared/LoginDialog', () => {
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
      error: false,
      errorMessage: '',
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

  it('should call onClickSubmit -> onClose when submitted', () => {
    setup();
    wrapper.instance().onClickSubmit();
    expect(props.onClick).toHaveBeenCalled();
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

  it('should return username_password when default onClick is called ', () => {
    setup();
    LoginDialog.defaultProps.onClick('meomeo', 'mimi').then((retVal) => {
      expect(retVal).toBe('meomeo_mimi');
    });
  });

  it('should render error Typography when errorMessage is true', () => {
    props.errorMessage = 'this is an error!';
    setup();
    expect(wrapper.find('[color="error"]').length).toBe(1);
  });

  it('should not render error Typography when error is false', () => {
    props.error = false;
    setup();
    expect(wrapper.find('[color="error"]').length).toBe(0);
  });
});
