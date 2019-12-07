import { loginReducer, UserState} from './app.reducer';
import { ActionReducerMap} from '@ngrx/store';

export interface AppState {
  appReducer: UserState;

}

export const reducers: ActionReducerMap<AppState> = {
  appReducer: loginReducer

};


