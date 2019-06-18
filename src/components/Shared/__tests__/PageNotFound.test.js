/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from 'components/Shared/PageNotFound';

describe('components/LoginDialog', () => {
  let wrapper;
  // let warning;

  const setup = () => {
    wrapper = shallow(<PageNotFound />);
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
