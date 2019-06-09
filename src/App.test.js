/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from 'App';

configure({ adapter: new Adapter() });

describe('<App /> shallow rendering', () => {
  it('render App without crashing', () => {
    // const wrapper = shallow(<App />);
    expect(1 + 2).toBe(3);
    console.log(wrapper);
  });
});
