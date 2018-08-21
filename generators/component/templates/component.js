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

/**
 * <%= camelCase %> Component
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

class <%= camelCase %> extends Component {
  constructor (props) {
    super(props);

  }
  render() {
    return (
      <div className="<%= kebabCase %>">My Cool Component!</div>
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