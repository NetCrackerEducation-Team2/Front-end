import {APP_ACTION } from './app.action';
import * as constants from './constants';
export interface AppReducerState {

  login: boolean;
  roles: any[];
  accessMap: any;
}

const initialState: AppReducerState = {
  login: false,
  roles: [ ],
  accessMap: new Map([[constants.admin, false],
                       [constants.superAdmin, false],
                       [constants.reviewModerator, false],
                       [constants.overviewModerator, false],
                       [constants.announcementModerator, false],
                       [constants.user, false]])

};


export function loginReducer(state = initialState, action) {
  switch (action.type) {

    case APP_ACTION.APP_LOGIN:
      return {
        ...state,
        login: true,
        roles: [...state.roles, ...action.payload]
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

