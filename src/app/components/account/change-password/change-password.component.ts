import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from "../../../service/account.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassEntity = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  errMessage = '';

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute) {
  }

  private userId: number;

  ngOnInit() {
    const currentUser = this.accountService.getCurrentUser();
    this.userId = +this.activatedRoute.snapshot.paramMap.get('userId');

    if (!currentUser || currentUser && currentUser.userId !== this.userId) {
      this.router.navigate(['']);
    }
  }

  save() {
    console.log('password changing...');
    this.accountService.updatePassword(this.changePassEntity.oldPassword, this.changePassEntity.newPassword)
      .subscribe(
        () => {
        },
        err => {
          this.errMessage = 'Error occurred. Try again';
          if (typeof err.error === 'string') {
            this.errMessage = err.error;
          }
        },
        () => {
          this.router.navigate(['profile', this.accountService.getCurrentUser().userId]);
        }
      );
  }

  checkPasswords() {
    return this.changePassEntity.confirmPassword === this.changePassEntity.newPassword;
  }

  submit() {
    if (!this.checkPasswords()) {
      this.errMessage = 'Passwords must match';
      return;
    }
    this.save();
  }
}
