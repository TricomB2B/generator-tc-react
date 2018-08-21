import React from 'react';

/**
 * <%= titleCase %> HOC
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

const <%= camelCase %> = (WrappedComponent, wrapperData) => {

  return class extends React.component {
    constructor (props) {
      super(props);

    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  });

};

export default <%= camelCase %>;