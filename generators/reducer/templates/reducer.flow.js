// @flow

export type <%= camelCase %>State = {
  initialized: boolean
};

export type <%= camelCase %>Action = {
  type: string|null
};

const defaultState = {
  initialized: false
};

/**
 * <%= titleCase %> Reducer
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

const <%= camelCase %> = (state: <%= camelCase %>State = defaultState, action: <%= camelCase %>Action) => {
  switch(action.type){
    // Sample:
    // ==============================
    // case DO.INITIALIZE:
    //   return {
    //     ...state,
    //     initialized: true
    //   };
    default:
      return state;
  }
};

export default <%= camelCase %>;