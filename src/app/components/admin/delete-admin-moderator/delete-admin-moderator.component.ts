import { Component, OnInit, OnDestroy } from '@angular/core';

import {AdminModeratorService} from '../../../service/admin-moderator.service';
import {take} from 'rxjs/operators';
import {AccountService} from '../../../service/account.service';
import {User} from '../../../models/user';
@Component({
  selector: 'app-delete-admin-moderator',
  templateUrl: './delete-admin-moderator.component.html',
  styleUrls: ['./delete-admin-moderator.component.css']
})
export class DeleteAdminModeratorComponent implements OnInit {

  checkEmail: string;
  email: string;
  isDownloading = true;
  isError: boolean;
  isDeleted: boolean;
  user: User;
  constructor(private admModerService: AdminModeratorService,
              private accountService: AccountService) {
  }


  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const currentUser = this.accountService.getCurrentUser();
    this.checkEmail = currentUser.email;
  }

  deleteUser(): void {
    if (this.checkEmail !== this.email) {
      this.admModerService.
      deleteAdminModer(this.email).pipe(take(1)).
      subscribe(resp => {this.isDeleted = true; this.isError = false; },
        error => {this.isError = true; this.isDeleted = false; });
    } else {
      this.isError = true; this.isDeleted = false;
    }
  }

}
