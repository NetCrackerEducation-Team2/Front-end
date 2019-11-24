import {Component, OnInit} from '@angular/core';
import {AdminModeratorService} from '../../service/admin-moderator.service';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import * as constants from '../../state/constants';


@Component({
  selector: 'app-edit-admin-moderator',
  templateUrl: './edit-admin-moderator.component.html',
  styleUrls: ['./edit-admin-moderator.component.css']
})
export class EditAdminModeratorComponent implements OnInit {
  user = {fullName: '', email: '', password: '', photo_path: 'asdasd', roles: []};
  roles = [constants.user, ...constants.adminRoles];
  repeatPassword: '';
  isError = false;
  message: string;


  constructor(private admModerService: AdminModeratorService, private store: Store<AppState>) {
  }


  ngOnInit() {
    console.log('edit-admin', ...this.roles);
  }

  checkPasswords(): boolean {
    return this.repeatPassword === this.user.password;
  }

  editUser(): void {
    this.admModerService.
    updateAdminModer(this.user).pipe(take(1)).
    subscribe();
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


