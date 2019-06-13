/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Dialog } from '@material-ui/core';
import { ConfirmDialog } from '../ConfirmDialog';

describe('components/LoginDialog', () => {
  let wrapper;
  let props;
  // let warning;

  const setup = () => {
    wrapper = shallow(<ConfirmDialog {...props} />);
  };

  beforeEach(() => {
    props = {
      title: 'title',
      contentText: 'text',
      open: true,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onConfirm on button click', () => {
    props.onConfirm = jest.fn();
    setup();
    const confirm = wrapper.find('#confirm-dialog-confirm');
    confirm.simulate('click');
    expect(props.onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel on button click', () => {
    props.onCancel = jest.fn();
    setup();
    const cancel = wrapper.find('#confirm-dialog-cancel');
    cancel.simulate('click');
    expect(props.onCancel).toHaveBeenCalled();
  });

  it('should call onClose on button click', () => {
    props.onClose = jest.fn();
    setup();
    const dialog = wrapper.find(Dialog);
    dialog.simulate('close');
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should define default props', () => {
    setup();
    expect(ConfirmDialog.defaultProps.onConfirm).toBeDefined();
    expect(ConfirmDialog.defaultProps.onClose).toBeDefined();
    expect(ConfirmDialog.defaultProps.onCancel).toBeDefined();
  });

  it('should return undefined for default functions', () => {
    setup();
    expect(ConfirmDialog.defaultProps.onConfirm()).toBe(undefined);
    expect(ConfirmDialog.defaultProps.onClose()).toBe(undefined);
    expect(ConfirmDialog.defaultProps.onCancel()).toBe(undefined);
  });
});
