/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import CategoriesTable from 'components/CategoriesTable';
import { MenuItem } from '@material-ui/core';

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
      onClick: jest.fn(),
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

  it('should call fetchPosts when a category is clicked', () => {
    setup();
    const { fetchPosts } = props;
    wrapper.findWhere((node) => node.key() === '1').simulate('click');
    expect(fetchPosts).toBeCalled();
  });

  it('should display items category is clicked', () => {
    props.selectedCatItems = {
      1: {
        name: 'hihi',
      },
      2: {
        name: 'hihi',
      },
    };
    setup();
    expect(wrapper.find(MenuItem).length).toBe(3);
  });
});
