import {Component, OnInit, OnDestroy} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {State, getIsLogin} from '../../state/app.state';
import {Store} from '@ngrx/store';
import {LOGOUT} from 'src/app/state/app.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  roles: any[];
  constructor(private store: Store<State>, private accService: AccountService) { }

  ngOnInit() {
   this.store.select(getIsLogin).subscribe(isLogin => {this.isLogged = isLogin;});
  }

  onLogout() {
    this.store.dispatch(new LOGOUT());
  }
}
