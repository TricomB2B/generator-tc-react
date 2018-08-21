import React from 'react';
import <%= camelCase %> from './<%= camelCase %>.js';
import { shallow } from 'enzyme';

describe('<%= camelCase %>', () => {

  let props;
  let mounted<%= camelCase %>;

  const <%= camelCase %> = () => {
    if (!mounted<%= camelCase %>)
      mounted<%= camelCase %> = shallow(<<%= camelCase %> {...props} />);
    return mounted<%= camelCase %>;
  };

  beforeEach(() => {
    props = {};
    mounted<%= camelCase %> = undefined;
  });

  it('renders', () => {
    <%= camelCase %>();
  });

});