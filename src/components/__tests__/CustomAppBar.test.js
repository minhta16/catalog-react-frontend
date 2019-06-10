/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { CustomAppBar } from 'components/CustomAppBar';

configure({ adapter: new Adapter() });

describe('components/CustomAppBar', () => {
  let wrapper;
  let props;
  // let warning;

  const setup = () => {
    wrapper = shallow(<CustomAppBar {...props} />);
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
    expect(wrapper).toMatchSnapshot();
  });
});
