import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import { LOGOUT } from 'src/app/state/app.action';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {fullName: '', email: '', createdAt: Date.now()};
  isLogged: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private accService: AccountService,
              private store: Store<any>
              ) {
  }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.accService.getUserById(userId)
      .subscribe(
        user => {
          this.profile = user;
        },
        error => {
          console.log('Error');
          console.error(error.error);
          // handle error
        }
      );

  }

  edit() {
    console.log('edit button clicked');
  }

  onLogout() {
    this.store.dispatch(new LOGOUT());
  }

}
