/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { PostItem } from 'components/Profile/PostItem';
import { IconButton, Menu } from '@material-ui/core';

describe('components/PostItem', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<PostItem {...props} />);
  };

  beforeEach(() => {
    props = {
      post: {
        name: 'bro',
        description: 'bro',
        category_id: '1',
        created: '2019',
      },
      token: 'minh',
      category: {
        name: 'cat',
        id: '1',
      },
      deletePostAndRefetch: jest.fn(),
      openSnackbar: jest.fn(),
      subtitleLength: 100,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render three dots if description is not lengthy', () => {
    props.post.description = '10 characters';
    setup();
    expect(
      wrapper
        .find('[variant="caption"]')
        .text()
        .includes('...'),
    ).toBe(false);
  });

  it('should render three dots if description is to lengthy', () => {
    props.post.description =
      '100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters 100 characters ';
    setup();
    expect(
      wrapper
        .find('[variant="caption"]')
        .text()
        .includes('...'),
    ).toBe(true);
  });

  describe('handleClick', () => {
    it('should set the anchorEl when button is clicked', () => {
      setup();
      const button = wrapper.find(IconButton);
      button.simulate('click', {
        target: button,
      });
      expect(wrapper.state().anchorEl).toBe(button);
    });
  });

  describe('handleClose', () => {
    it('should set the anchorEl when button is clicked', () => {
      setup();
      const menu = wrapper.find(Menu);
      menu.simulate('close');
      expect(wrapper.state().anchorEl).toBe(undefined);
    });
  });

  describe('toggleDeleteDialog', () => {
    it('should set the anchorEl when button is clicked', () => {
      setup();
      const menu = wrapper.find('#post-item-delete');
      const { openConfirm } = wrapper.state();
      menu.simulate('click');
      expect(wrapper.state().openConfirm).toBe(!openConfirm);
    });
  });

  describe('handleConfirmDelete', () => {
    it('should call deletePostAndRefetch and openSnackbar', () => {
      setup();
      const confirmDialog = wrapper.find('[title="Delete"]');
      confirmDialog.simulate('confirm');
      expect(props.deletePostAndRefetch).toHaveBeenCalled();
      expect(props.openSnackbar).toHaveBeenCalled();
    });
  });
});
