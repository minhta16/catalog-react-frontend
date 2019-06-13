/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { ModifyItem } from '../ModifyItem';

describe('components/ModifyItem', () => {
  let wrapper;
  let props;
  // let warning;

  // const update = () => {
  //   wrapper.update();
  //   warning = wrapper.find(Warning);
  // };

  const setup = () => {
    wrapper = shallow(<ModifyItem {...props} />);
  };

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: '1',
          postId: '1',
        },
      },
      post: {
        name: 'haha',
        description: 'haha',
        id: '1',
        category_id: '1',
      },
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state when a field is changed', () => {
    setup();
    const titleField = wrapper.find('#title');
    titleField.simulate('change', {
      target: {
        value: 'meomeo',
        id: 'title',
      },
    });
    expect(wrapper.state().title).toBe('meomeo');
  });

  it('should not have title and desc when id is not available', () => {
    props.match.params.id = '';
    setup();
    expect(wrapper.state().editing).toBe(false);
  });
});
