import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './state/app.state';
import {take} from 'rxjs/operators';
import {updateRolesState} from './state/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NetcrackerEducationFrontend';
  subscriptionStoreLocalStorageCompound: Subscription;

  constructor(private store: Store<State>) {
  }
  ngOnDestroy() {
    this.subscriptionStoreLocalStorageCompound.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionStoreLocalStorageCompound = this.store.select('user').pipe(take(1)).subscribe(state => {
                                                                state.login = JSON.parse(localStorage.getItem('currentUser')).enabled;
                                                                state.roles = JSON.parse(localStorage.getItem('currentUser')).roles;
                                                                updateRolesState(state);
                                                                state.id = JSON.parse(localStorage.getItem('currentUser')).userId; });
  }

}
