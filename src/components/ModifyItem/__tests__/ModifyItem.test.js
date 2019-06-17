/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { ModifyItem } from '../ModifyItem';

describe('components/ModifyItem', () => {
  let wrapper;
  let props;
  // let warning;

  const update = () => {
    wrapper.update();
  };

  const setup = () => {
    wrapper = shallow(<ModifyItem {...props} />);
  };

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: '1',
          postId: '1',
        },
      },
      post: {
        name: 'haha',
        description: 'haha',
        id: '1',
        category_id: '1',
      },
      categories: [
        {
          name: 'haha',
          description: 'haha',
          id: '1',
        },
      ],
      token: 'minh',
      modifyPostAndRefetch: jest.fn(),
      addPostAndRefetch: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('state.selectedCategory', () => {
    it('should be 0 when categories has no elements', () => {
      props.match.params = {};
      props.categories = [];
      setup();
      expect(wrapper.state().selectedCategory).toBe('0');
    });
  });

  it('should change state when a field is changed', () => {
    setup();
    const titleField = wrapper.find('#title');
    titleField.simulate('change', {
      target: {
        value: 'meomeo',
        id: 'title',
      },
    });
    expect(wrapper.state().title).toBe('meomeo');
  });

  it('should not have title and desc when id is not available', () => {
    props.match.params.id = '';
    setup();
    expect(wrapper.state().editing).toBe(false);
  });

  it('should call modifyPostAndRefetch() if editing', () => {
    setup();
    wrapper.setState({
      editing: true,
    });
    update();
    wrapper.instance().handleOnSubmit({ preventDefault: jest.fn() });
    expect(props.modifyPostAndRefetch).toHaveBeenCalled();
  });

  it('should call addPostAndRefetch() if not editing', () => {
    setup();
    wrapper.setState({
      editing: false,
    });
    update();
    wrapper.instance().handleOnSubmit({ preventDefault: jest.fn() });
    expect(props.addPostAndRefetch).toHaveBeenCalled();
  });

  it('should change state when handleCategoryChange() is called', () => {
    setup();
    const categoryDrop = wrapper.find('#categories');
    categoryDrop.simulate('change', {
      target: {
        name: 'selectedCategory',
        value: 99,
      },
    });
    expect(wrapper.state().selectedCategory).toBe(99);
  });
});
