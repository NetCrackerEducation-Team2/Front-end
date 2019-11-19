import { Component, OnInit } from '@angular/core';
import {AdminModeratorService} from '../../service/admin-moderator.service';
@Component({
  selector: 'app-create-admin-moderator',
  templateUrl: './create-admin-moderator.component.html',
  styleUrls: ['./create-admin-moderator.component.css']
})
export class CreateAdminModeratorComponent implements OnInit {
  user = {fullName: '', email: '', password: '', role: ''};
  roles: any[];
  repeatPassword: '';
  isError: boolean;
  message: string;
  isCreated: boolean;

  constructor(private admModerService: AdminModeratorService) {
    this.isError = false;
    this.isCreated = false;
  }

  ngOnInit() {
    this.roles = ["admin", "moderatorForReviews", "moderatorForBooks", "moderatorFor Reviews"];
  }

  checkPasswords(): boolean {
    return this.repeatPassword === this.user.password;
  }

  create(): void {
    console.log('create user', this.user);
    this.admModerService.
    createAdminModer(this.user.fullName, this.user.email, this.user.password, this.user.role).
    subscribe( resp => {this.isCreated = true; })

  }

}
