/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { PostPaper } from 'components/Post/PostPaper';

configure({ adapter: new Adapter() });

describe('components/PostPaper', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<PostPaper {...props} />);
  };

  beforeEach(() => {
    props = {
      header: 'header',
      description: 'body',
      categoryId: '1',
      categoryName: 'name',
      created: '2019',
      price: 100,
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
