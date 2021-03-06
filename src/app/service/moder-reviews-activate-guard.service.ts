import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import { take } from 'rxjs/operators';
import * as constants from '../state/constants';
@Injectable({
  providedIn: 'root'
})
export class ModerReviewsActivateGuardService implements CanActivate, OnDestroy {
  subscriptionUserState: any;
  constructor(private store: Store<State>) { }
  ngOnDestroy() {
    this.subscriptionUserState.unsubscribe();
  }
  canActivate(): boolean {
    let access = false;
    this.subscriptionUserState =
    this.store.select('user')
    .pipe(take(1))
    .subscribe( state => {  if ( (state.roles.includes(constants.reviewModerator) ||
                                  state.roles.includes(constants.admin) ||
                                  state.roles.includes(constants.superAdmin)) &&
                                  state.login) {
      access = true;
    }} );

    return access;
  }
}
