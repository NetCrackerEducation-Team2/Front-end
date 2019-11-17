import { loginReducer, AppReducerState} from './app.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  appReducer: AppReducerState;

}

export const reducers: ActionReducerMap<AppState> = {
  appReducer: loginReducer

};
