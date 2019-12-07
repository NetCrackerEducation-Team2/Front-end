import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Store } from '@ngrx/store';
import {AppState} from '../state/app.state';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminActivateGuardService implements CanActivate {

  constructor(private store: Store<AppState>) { }


  canActivate(): boolean {
    let access = false;

    this.store.select('appReducer')
    .pipe(take(1))
    .subscribe( state => {  if ((state.roles.includes('ADMIN') ||
                                 state.roles.includes('SUPER_ADMIN')) &&
                                 state.login) {
      access = true;
    }} );

    return access;
  }
}
