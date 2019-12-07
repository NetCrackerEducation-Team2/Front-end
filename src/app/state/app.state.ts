import { loginReducer, UserState/*, getIsLoggedIn, getRoles*/} from './app.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  appReducer: UserState;

}

export const reducers: ActionReducerMap<AppState> = {
  appReducer: loginReducer

};

/*
export const getAppState = createFeatureSelector<AppState>('user');

export const getUserState = createSelector(getAppState, ( state: AppState) => state.appReducer );

export const getUserRoles = createSelector(getUserState, getRoles );
export const getUserIsLoggedIn = createSelector(getUserState, getIsLoggedIn);
*/
