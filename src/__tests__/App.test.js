/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import App from 'App';

configure({ adapter: new Adapter() });

describe('src/App', () => {
  let wrapper;
  // let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<App />);
  };

  it('should render App without crashing', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
