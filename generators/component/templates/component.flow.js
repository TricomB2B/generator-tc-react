// @flow

import React, { Component } from 'react';
<% if (reduxDispatch) { -%>
import { connect } from 'react-redux';
<% } -%>
<% if (router) { -%>
import { withRouter } from 'react-router-dom';
<% } -%>

<% if (styling) { -%>
import './<%= camelCase %>.scss';
<% } -%>

type Props = {
  // Props here
};

/**
 * <%= camelCase %> Component
 * <%= description %>
 * @author <%= user_name %> <<%= email %>>
 */

class <%= camelCase %> extends Component <Props> {
  constructor (props: Props) {
    super(props);

  }
  render() {
    return (
      <div className={`<%= className %>`}>My Cool Component!</div>
    );
  }
}

<% if (reduxDispatch) { -%>
const mapStateToProps = state => {
  return {
    state: state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // Your methods here
  }
};

const <%= camelCase %>Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= camelCase %>);
<% } -%>

<% if (router) { -%>
export default withRouter(<%= camelCase %><%= reduxDispatch ? 'Component' : '' %>);
<% }else { -%>
export default <%= camelCase %><%= reduxDispatch ? 'Component' : '' %>;
<% } -%>