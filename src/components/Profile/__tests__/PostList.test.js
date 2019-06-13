/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import InfoSnackbar from 'components/Shared/InfoSnackbar';
import { PostList } from '../PostList';

describe('components/Profile/PostList', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<PostList {...props} />);
  };

  beforeEach(() => {
    props = {
      posts: [
        {
          name: 'bro',
          description: 'bro',
          category_id: '1',
          created: '2019',
          id: '1',
        },
      ],
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call closeSnackbar correctly', () => {
    setup();
    const snackbar = wrapper.find(InfoSnackbar);
    snackbar.simulate('close');
    expect(wrapper.state().openSnackbar).toBe(false);
  });
});
