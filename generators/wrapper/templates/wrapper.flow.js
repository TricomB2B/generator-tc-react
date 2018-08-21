// @flow

import React from 'react';

type <%= camelCase %>Type = {
  // types
};

/**
 * <%= titleCase %> HOC
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

const <%= camelCase %> = (WrappedComponent: any, wrapperData: <%= camelCase %>Type) => {

  return class extends React.component<Props> {
    constructor (props: Props) {
      super(props);

    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  });

};

export default <%= camelCase %>;