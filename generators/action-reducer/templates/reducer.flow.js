// @flow

import * as DO from '@actions/<%= lowerCase %>';

/**
 * <%= titleCase %> Reducer
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

export type <%= camelCase %>State = {
  initialized: boolean
};

export type <%= camelCase %>Action = {
  type: string|null
};

const defaultState = {
  initialized: false
};

const <%= lowerCase %> = (state: <%= camelCase %>State = defaultState, action: <%= camelCase %>Action) => {
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