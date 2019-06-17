/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { App } from 'App';

describe('src/App', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<App {...props} />);
  };

  beforeEach(() => {
    props = {
      fetchCategories: jest.fn(),
    };
  });

  it('should render App without crashing', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchCategories when render', () => {
    setup();
    expect(props.fetchCategories).toHaveBeenCalled();
  });
});
