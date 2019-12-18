import { Component, OnInit, OnDestroy } from '@angular/core';
import {AdminModeratorService} from '../../../service/admin-moderator.service';
import { take } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {State, getUserRoles} from '../../../state/app.state';
import * as constants from '../../../state/constants';
import { Subscription } from 'rxjs';

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
  rolesSubscription: any;
  isCreated: boolean;
  isDownloading = true;

  constructor(private admModerService: AdminModeratorService, private store: Store<State>) {
  }

  ngOnInit() {
    this.rolesSubscription = this.store.select(getUserRoles).
    pipe(take(1)).
    subscribe(roles => { if (roles.includes(constants.superAdmin)) { this.roles = this.superAdminRoles; } else
                         if (roles.includes(constants.admin)) { this.roles = this.adminRoles; }  } ).unsubscribe();
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


  change(event): void {
       console.log(event.source.selected, event.source.value);
       if (event.source.selected) {
        this.user.roles.push({name: event.source.value});
       } else if (!event.source.selected) {
        this.user.roles.pop();
       }

  }

}
