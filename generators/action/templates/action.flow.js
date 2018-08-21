// @flow

/**
 * <%= titleCase %> Actions
 * <%= description %>
 * @author <%= name %> <<%= email %>>
 */

// ============================
// ACTION TYPES
// ============================

export const INITIALIZE       = '<%= upperCase %>::INITIALIZE';

// ============================
// ACTION CREATORS
// ============================

export const initialize = () => (dispatch: (Action: any) => void) => {
  dispatch(_initialize());
};

// ============================
// ACTION METHODS
// ============================

function _initialize () {
  return {
    type: INITIALIZE
  }
}