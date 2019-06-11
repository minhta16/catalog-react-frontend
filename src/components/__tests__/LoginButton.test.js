/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import LoginButton from 'components/LoginButton';
import { JestEnvironment } from '@jest/environment';

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
    props = {
      onClick: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
