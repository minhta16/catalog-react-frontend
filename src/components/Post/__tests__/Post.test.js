/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import { Post } from 'components/Post/Post';
import { CircularProgress } from '@material-ui/core';
import PostPaper from '../PostPaper';

configure({ adapter: new Adapter() });
describe('components/Post', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<Post {...props} />);
  };

  beforeEach(() => {
    props = {
      match: {
        params: {
          postId: '1',
          id: '1',
        },
      },
      location: {
        snackbarMess: 'tru',
      },
      selectedCatItems: {
        1: {
          name: 'name',
          created: '2019',
          description: 'desc',
          id: '1',
        },
      },
      currentPost: {
        name: 'name',
        created: '2019',
        description: 'desc',
        id: '1',
      },
      category: {
        name: 'name',
      },
      fetchPosts: jest.fn(),
      openSnackbar: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect if state.redirect', () => {
    setup();
    wrapper.setState({
      redirect: true,
    });
    expect(wrapper.find(Redirect).length).toBe(1);
  });

  it('should not openSnackbar if snackbarMess is not present', () => {
    props.location.snackbarMess = '';
    setup();
    expect(props.openSnackbar).not.toHaveBeenCalled();
  });

  it('should openSnackbar if snackbarMess is present', () => {
    props.location.snackbarMess = 'meomeo';
    setup();
    expect(props.openSnackbar).toHaveBeenCalled();
  });

  it('should display postpaper if category and currentPost is present', () => {
    setup();
    expect(wrapper.find(PostPaper).length).toBe(1);
  });

  it('should not display postpaper if category and currentPost is not present', () => {
    props.currentPost = undefined;
    setup();
    expect(wrapper.find(CircularProgress).length).toBe(1);
  });
});
