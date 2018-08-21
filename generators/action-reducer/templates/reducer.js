import * as DO from '@actions/<%= lowerCase %>';

/**
 * <%= titleCase %> Reducer
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

const defaultState = {
  initialized: false
};

const <%= lowerCase %> = (state = defaultState, action) => {
  switch(action.type){
    case DO.INITIALIZE:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

export default <%= lowerCase %>;