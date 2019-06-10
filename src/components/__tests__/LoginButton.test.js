/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginButton from 'components/LoginButton';

configure({ adapter: new Adapter() });

describe('components/LoginButton', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<LoginButton {...props} />);
  };

  beforeEach(() => {
    props = {};
  });

  it('should render correctly', () => {
    setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
