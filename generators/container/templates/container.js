import React, { Component } from 'react';
<% if (reduxDispatch) { -%>
import { connect } from 'react-redux';
<% } -%>
<% if (router) { -%>
import { withRouter } from 'react-router-dom';
<% } -%>

/**
 * <%= camelCase %> Container
 * <%= description %>
 * @author <%= user_name %> <<%= email %>>
 */

class <%=camelCase%> extends Component {
  constructor (props) {
    super(props);

  }
  render() {
    return (
      <div className="<%= kebabCase %>">A NEW CONTAINER EMERGES</div>
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

const <%= camelCase %>Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= camelCase %>);
<% } -%>

<% if (router) { -%>
export default withRouter(<%= camelCase %><%= reduxDispatch ? 'Container' : '' %>);
<% }else { -%>
export default <%= camelCase %><%= reduxDispatch ? 'Container' : '' %>;
<% } -%>