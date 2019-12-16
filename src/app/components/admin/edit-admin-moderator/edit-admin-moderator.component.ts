import {Component, OnInit} from '@angular/core';
import {AdminModeratorService} from '../../../service/admin-moderator.service';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state/app.state';
import * as constants from '../../../state/constants';
import {AccountService} from '../../../service/account.service';
import {User} from '../../../models/user';


@Component({
  selector: 'app-edit-admin-moderator',
  templateUrl: './edit-admin-moderator.component.html',
  styleUrls: ['./edit-admin-moderator.component.css']
})
export class EditAdminModeratorComponent implements OnInit {
  user = {userId: null, fullName: '', email: '', password: '', photo_path: '', roles: []};
  roles = [constants.user, ...constants.adminRoles];
  repeatPassword: '';
  isError = false;
  isEdited = false;
  email: string;


  constructor(private admModerService: AdminModeratorService, private store: Store<AppState>,
              private accountService: AccountService) {
  }


  ngOnInit() {
    this.getCurrentUser();
  }

  checkPasswords(): boolean {
    return this.repeatPassword === this.user.password;
  }

  getCurrentUser() {
    const currentUser = this.accountService.getCurrentUser();
    this.email = currentUser.email;
  }

  editUser(): void {
    if (this.email !== this.user.email) {
      this.admModerService.
      updateAdminModer(this.user).pipe(take(1)).
      subscribe(resp => {this.isEdited = true; this.isError = false; },
                error => {this.isError = true; this.isEdited = false; });
    } else {
      this.isError = true;
      this.isEdited = false;
    }
  }

  change(event): void {
       console.log(event.source.selected, event.source.value);
       if (event.source.selected) {
        this.user.roles.push({name: event.source.value});
       } else if (!event.source.selected) {
        this.user.roles.pop();
       }

  }

}


