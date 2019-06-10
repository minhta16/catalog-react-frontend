/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import PostPaper from 'components/PostPaper';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

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
    wrapper = shallow(
      <Provider store={store}>
        <PostPaper {...props} />
      </Provider>,
    );
  };

  beforeEach(() => {
    props = {
      header: 'header',
      body: 'body',
      categoryId: '1',
    };
  });

  it('should render correctly', () => {
    setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
