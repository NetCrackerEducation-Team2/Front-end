import {APP_ACTION,  LOGIN, LOGOUT } from './app.action';

export interface AppReducerState {
  login: boolean;
  roles: any[];
  accessMap: any;
}

const initialState: AppReducerState = {
  login: false,
  roles: [ ],
  accessMap: new Map([['moderatorForAnnouncements', false],
                       ['moderatorForReviews', false],
                       ['moderatorForBookOverview', false],
                       ['admin', false],
                       ['superadmin', false],
                       ['user', false]])

};


export function loginReducer(state = initialState, action) {
  switch (action.type) {

    case APP_ACTION.APP_LOGIN:
      return {
        ...state,
        login: true,
        roles: state.roles.concat(action.payload)
    };
    case APP_ACTION.APP_LOGOUT:
      return {
        ...state,
        login: false,
        roles: initialState.roles
    };
    default:
      return state;
  }

}

