import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {AppState} from '../../state/app.state';
import {Store} from '@ngrx/store';
import { LOGOUT } from 'src/app/state/app.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  roles: any[];
  constructor(private store: Store<AppState>, private accService: AccountService) { }

  ngOnInit() {
    this.store.select('appReducer').subscribe(reducer => {this.isLogged = reducer.login; console.log(this.isLogged, 'header'); } );

  }

  onLogout() {
    this.store.dispatch(new LOGOUT());
  }
}
