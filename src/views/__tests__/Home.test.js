/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Home } from 'views/Home';

configure({ adapter: new Adapter() });

describe('views/Home', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   // warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<Home {...props} />);
  };

  beforeEach(() => {
    props = {
      fetchCategories: jest.fn(),
      match: {
        params: {
          id: '1',
        },
      },
      fetchPosts: jest.fn(),
      categories: {
        1: {
          created: '2019',
          updated: '2019',
          description: 'testDesc',
          name: 'testName',
          id: '1',
        },
      },
      selectedCatItems: {},
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('When view mounts', () => {
    it('should call fetchCategories', () => {
      setup();
      expect(props.fetchCategories).toHaveBeenCalled();
    });

    it('should call fetchCategories', () => {
      setup();
      expect(props.fetchCategories).toHaveBeenCalled();
    });

    it('should not call fetchPosts if id is blank', () => {
      props.match.params.id = '';
      setup();
      expect(props.fetchPosts).not.toHaveBeenCalled();
    });

    it('should call fetchPosts if id is something', () => {
      setup();
      expect(props.fetchPosts).toHaveBeenCalled();
    });
  });
});
