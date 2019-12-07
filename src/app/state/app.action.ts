import {Action} from '@ngrx/store';

export const APP_ACTION = {
    APP_LOGIN: 'LOGIN',
    APP_LOGOUT: 'LOGOUT'

};
export class LOGIN implements Action {

  readonly type: any = APP_ACTION.APP_LOGIN;
  constructor(public payload: any) {
  }
}


export class LOGOUT implements Action {

  readonly type: any = APP_ACTION.APP_LOGOUT;
  constructor() {
  }

}


