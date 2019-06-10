/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import CategoriesTable from 'components/CategoriesTable';

configure({ adapter: new Adapter() });

describe('components/CategoriesTable', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<CategoriesTable {...props} />);
  };

  beforeEach(() => {
    props = {
      selectedCatId: '1',
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
      fetchPosts: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display items when categories is clicked', () => {
    setup();
    const { fetchPosts } = props;
    wrapper.findWhere(node => node.key() === '1').simulate('click');
    expect(fetchPosts).toBeCalled();
  });
});
