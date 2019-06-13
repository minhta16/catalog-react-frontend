/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Post } from 'views/Post';

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
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
