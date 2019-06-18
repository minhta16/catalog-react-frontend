/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import CategoriesTable from 'components/Home/CategoriesTable';
import { CircularProgress } from '@material-ui/core';

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
      categories: [
        { created: '2019', updated: '2019', description: 'testDesc', name: 'testName', id: '1' },
      ],
      selectedCat: {
        created: '2019',
        updated: '2019',
        description: 'testDesc',
        name: 'testName',
        id: '1',
      },
      selectedCatItems: [],
      fetchPosts: jest.fn(),
      categoriesLoading: false,
      postsLoading: false,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a CircularProgress if categoriesLoading is true', () => {
    props.categoriesLoading = true;
    setup();
    expect(wrapper.find(CircularProgress).length).toBe(1);
  });

  it('should render a CircularProgress if postsLoading is true', () => {
    props.postsLoading = true;
    setup();
    expect(wrapper.find(CircularProgress).length).toBe(1);
  });

  it('should display no names if selectedCat is not present', () => {
    props.selectedCat = {};
    setup();
    expect(wrapper.find('#categories-table-name-typo').text()).toBe('');
  });

  it('should display a name  if selectedCat is  present', () => {
    setup();
    expect(wrapper.find('#categories-table-name-typo').text()).toBe(props.selectedCat.name);
  });

  it('should call fetchPosts when a category is clicked', () => {
    setup();
    const { fetchPosts } = props;
    wrapper.findWhere((node) => node.key() === '1').simulate('click');
    expect(fetchPosts).toBeCalled();
  });

  it('should call getShortDescription correctly', () => {
    setup();
    const shortString = 'short string';
    expect(wrapper.instance().getShortDescription(shortString)).toEqual(shortString);
    const longString =
      'longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg string';
    expect(wrapper.instance().getShortDescription(longString)).toEqual(
      'longgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg...',
    );
  });

  it('should display items if selectedCatId is provided', () => {
    props.selectedCatItems = [
      {
        name: 'hihi',
        id: '1',
        description: 'meomeo',
      },
      {
        name: 'hihi',
        id: '2',
        description: 'gaugau',
      },
    ];
    props.selectedCatId = '1';
    setup();
    expect(wrapper.find('.itemsMenuItem').length).toBe(2);
  });

  it('should display a Typography if selectedCatId is not provided', () => {
    props.selectedCatItems = [
      {
        name: 'hihi',
      },
      {
        name: 'hihi',
      },
    ];
    props.selectedCatId = '';
    setup();
    expect(wrapper.find('.itemTypography').length).toBe(1);
  });
});
