/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Post } from 'components/Post/Post';
import InfoSnackbar from 'components/Shared/InfoSnackbar';

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
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call closeSnackbar() correctly', () => {
    setup();
    const snackbar = wrapper.find(InfoSnackbar);
    snackbar.simulate('close');
    expect(wrapper.state().openSnackbar).toBe(false);
  });

  it('should call closeSnackbar(true) if snackbarMess exists', () => {
    props.location.snackbarMess = 'asd';
    setup();
    expect(wrapper.state().openSnackbar).toBe(true);
  });

  it('should call closeSnackbar(false) if snackbarMess does not exists', () => {
    props.location.snackbarMess = '';
    setup();
    expect(wrapper.state().openSnackbar).toBe(false);
  });
});
