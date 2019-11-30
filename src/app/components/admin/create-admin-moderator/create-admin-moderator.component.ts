import { Component, OnInit } from '@angular/core';
import {AdminModeratorService} from '../../../service/admin-moderator.service';
import { take } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state/app.state';
import * as constants from '../../../state/constants';

@Component({
  selector: 'app-create-admin-moderator',
  templateUrl: './create-admin-moderator.component.html',
  styleUrls: ['./create-admin-moderator.component.css']
})
export class CreateAdminModeratorComponent implements OnInit {
  adminRoles = constants.adminRoles;
  superAdminRoles = constants.superAdminRoles;
  user = {fullName: '', email: '', password: '', photo_path: '', roles: []};
  roles: any[];
  repeatPassword: '';
  isError: boolean;
  isCreated: boolean;
  isDownloading = true;

  constructor(private admModerService: AdminModeratorService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('appReducer').
    pipe(take(1)).
    subscribe(state => { if (state.roles.includes(constants.superAdmin)) { this.roles = this.superAdminRoles; }
                         else if (state.roles.includes(constants.admin)) { this.roles = this.adminRoles; }  } );
  }

  checkPasswords(): boolean {
    return this.repeatPassword === this.user.password;
  }

  createModerAdmin(): void {
    this.admModerService.
    createAdminModer(this.user).pipe(take(1)).
    subscribe(resp => {this.isCreated = true; this.isError = false;},
               error => {this.isError = true; this.isCreated = false;
               });
  }


  change(event) {
       console.log(event.source.selected, event.source.value);
       if (event.source.selected) {
        this.user.roles.push({name: event.source.value});
       } else if (!event.source.selected) {
        this.user.roles.pop();
       }

  }

}
