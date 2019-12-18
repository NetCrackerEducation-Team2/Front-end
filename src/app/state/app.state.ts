import * as fromUser from './user';
import { createSelector } from 'reselect';
import { ActionReducerMap} from '@ngrx/store';

export interface State {
  user: fromUser.UserState;

}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.userReducer
};



const getUserState = (state: State) => state.user;
export const getUserId = createSelector(getUserState, fromUser.getUserId);
export const getUserRoles = createSelector(getUserState, fromUser.getRoles);
export const getIsLogin = createSelector(getUserState, fromUser.getIsLogin);
