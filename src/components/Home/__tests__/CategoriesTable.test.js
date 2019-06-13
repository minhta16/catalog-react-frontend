/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import CategoriesTable from 'components/Home/CategoriesTable';

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
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
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

  it('should display items if selectedCatId is provided', () => {
    props.selectedCatItems = [
      {
        name: 'hihi',
      },
      {
        name: 'hihi',
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
