import {APP_ACTION } from './app.action';
import * as constants from './constants';


export interface UserState {

  login: boolean;
  roles: any[];
  accessMap: any;
  id: number;
}

const initialState: UserState = {
  login: false,
  roles: [ ],
  accessMap: new Map([[constants.admin, false],
                       [constants.superAdmin, false],
                       [constants.reviewModerator, false],
                       [constants.overviewModerator, false],
                       [constants.announcementModerator, false],
                       [constants.user, false]]),
  id: null,

};


export function userReducer(state = initialState, action) {
  switch (action.type) {

    case APP_ACTION.APP_LOGIN:
      return {
        ...state,
        login: true,
        roles: [...state.roles, ...action.payload.roles],
        id: action.payload.userId
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
export function updateRolesState(state: UserState) {

  for (const role of state.roles) {
    accessMapChange(state, role);
  }
  if (state.roles.length < 1) {
   state.accessMap.set(constants.admin, false);
   state.accessMap.set(constants.superAdmin, false);
   state.accessMap.set(constants.overviewModerator, false);
   state.accessMap.set(constants.reviewModerator, false);
   state.accessMap.set(constants.announcementModerator, false);
  }
  state.accessMap.set(constants.user, state.login);

}

export function accessMapChange(state: UserState, role) {
  switch (role) {
    case constants.admin:
      state.accessMap.set(constants.admin, true);
      break;
    case constants.superAdmin:
      state.accessMap.set(constants.superAdmin, true);
      break;
    case constants.overviewModerator:
      state.accessMap.set(constants.overviewModerator, true);
      break;
    case constants.reviewModerator:
      state.accessMap.set(constants.reviewModerator, true);
      break;
    case constants.announcementModerator:
      state.accessMap.set(constants.announcementModerator, true);
      break;
  }

}


export const getUserId = (state: UserState) => state.id;
export const getIsLogin = (state: UserState) => state.login;
export const getRoles = (state: UserState) => state.roles;
