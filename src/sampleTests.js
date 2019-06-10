/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from 'App';

configure({ adapter: new Adapter() });

describe('<App /> shallow rendering', () => {
  it('should render App', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper);
  });

  it('should contain 1 p elements', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('p').length).toBe(1);
    console.log(wrapper);
  });

  it('should contain className App-header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App-header').exists()).toBe(true);
    console.log(wrapper);
  });

  it('should contain 3 ul-li elements', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ul').children().length).toBe(3);
    console.log(wrapper);
  });

  it('should contain ul with className yolo', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ul').hasClass('yolo')).toBe(true);
    console.log(wrapper);
  });

  it('matches the snapshot', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('on button click changes div text', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find('button');
    expect(wrapper.find('.button-state').text()).toBe('No :(');
    button.simulate('click');
    expect(wrapper.find('.button-state').text()).toBe('Yes!');
  });

  it('on input change changes text', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('input');
    expect(wrapper.find('.input-text').text()).toBe('');
    input.simulate('change', { currentTarget: { value: 'Minh' } });
    expect(wrapper.find('.input-text').text()).toBe('Minh');
  });

  // Test with life cycle methods
  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
  });

  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<App />);
    wrapper.setProps({ hide: true });
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1);
  });

  // Test with methods
  it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />);
    const trueReturn = wrapper.instance().handleStrings('Hello World');
    expect(trueReturn).toBe(true);
  });
});

describe('<App /> mount rendering', () => {
  it('should render App', () => {
    const wrapper = mount(<App />);
    console.log(wrapper);
    wrapper.unmount();
  });

  it('matches the snapshot', () => {
    const tree = mount(<App />);
    expect(toJson(tree)).toMatchSnapshot();
    tree.unmount();
  });
});

describe('<Link />', () => {
  it('link component accept addres props', () => {
    const wrapper = shallow(<Link address="www.google.com" />);
    expect(wrapper.instance().props.address).toBe('www.google.com');
  });

  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address="www.google.com" />);
    expect(wrapper.props().href).toBe('www.google.com');
  });

  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false} />);
    expect(wrapper.find('a').length).toBe(1);
    wrapper.setProps({ hide: true });
    expect(wrapper.get(0)).toBeNull();
  });
});
