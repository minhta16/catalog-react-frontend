/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
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
      modifyPost: jest.fn(),
      addPost: jest.fn(),
      resetAddPostSuccess: jest.fn(),
      clearPostError: jest.fn(),
      addPostSuccess: false,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('state.selectedCategory', () => {
    it('should be empty when categories has no elements', () => {
      props.match.params = {};
      props.categories = [];
      setup();
      expect(wrapper.state().selectedCategory).toBe('');
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

  it('should call modifyPost() if editing', () => {
    setup();
    wrapper.setState({
      editing: true,
    });
    update();
    wrapper.instance().handleOnSubmit({ preventDefault: jest.fn() });
    expect(props.modifyPost).toHaveBeenCalled();
  });

  it('should call addPost() if not editing', () => {
    setup();
    wrapper.setState({
      editing: false,
    });
    update();
    wrapper.instance().handleOnSubmit({ preventDefault: jest.fn() });
    expect(props.addPost).toHaveBeenCalled();
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

  it('should redirect to correct path if editing', () => {
    setup();
    wrapper.setState({
      editing: true,
      redirect: true,
    });
    expect(wrapper.find(Redirect).prop('to')).toEqual({
      pathname: '/1/1',
      snackbarMess: 'Post edited!',
    });
  });

  it('should redirect to correct path if not editing', () => {
    setup();
    wrapper.setState({
      editing: false,
      redirect: true,
      selectedCategory: '0',
    });
    expect(wrapper.find(Redirect).prop('to')).toEqual({
      pathname: '/0',
      snackbarMess: 'Post created!',
    });
  });

  it('should set redirect if componentDidUpdate satisfies', () => {
    props.addPostSuccess = true;
    setup();
    expect(wrapper.state().redirect).toBe(false);
    wrapper.instance().componentDidUpdate({ addPostSuccess: false });
    expect(wrapper.state().redirect).toBe(true);
  });

  it('should map out error if errorMessage exists', () => {
    props.errorMessage = ['meomeo', 'mini'];
    setup();
    expect(wrapper.find('[color="error"]').length).toBe(2);
  });
});
