/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CustomAppBar from 'components/CustomAppBar';

const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe('components/CustomAppBar', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(
      <Provider store={store}>
        <CustomAppBar {...props} />
      </Provider>,
    );
  };

  beforeEach(() => {
    props = {
      color: 'primary',
      currentUser: {
        username: 'minh',
        password: 'minh',
        token: 'abc',
      },
    };
  });

  it('should render correctly', () => {
    setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
