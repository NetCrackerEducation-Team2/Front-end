import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../state/app.state';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserActivateGuardService implements CanActivate {

  constructor(private store: Store<State>) { }
  canActivate(): boolean {
    let access = false;
    this.store.select('user')
    .pipe(take(1))
    .subscribe( state => {  if (state.login) {
      access = true;
    }} );

    return access;
  }

}
