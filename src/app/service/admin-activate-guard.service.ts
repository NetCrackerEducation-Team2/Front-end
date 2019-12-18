import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Store } from '@ngrx/store';
import {State} from '../state/app.state';
import {take} from 'rxjs/operators';
import * as constants from '../state/constants';
@Injectable({
  providedIn: 'root'
})
export class AdminActivateGuardService implements CanActivate, OnDestroy {

  constructor(private store: Store<State>) { }
  subscriptionUserState: any;
  ngOnDestroy(){
    this.subscriptionUserState.unsubscribe();
  }
  canActivate(): boolean {
    let access = false;

    this.subscriptionUserState =
    this.store.select('user')
    .pipe(take(1))
    .subscribe( state => {  if ((state.roles.includes(constants.admin) ||
                                 state.roles.includes(constants.superAdmin)) &&
                                 state.login) {
      access = true;
    }} );

    return access;
  }
}
