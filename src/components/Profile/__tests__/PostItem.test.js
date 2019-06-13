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
      subtitleLength: 100,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
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
});