import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
  }


  ngOnInit() {
  }

  save() {
    console.log('password saved...');
    this.router.navigate(['/profile']);
  }

  checkPasswords() {
    return this.changePassEntity.confirmPassword === this.changePassEntity.newPassword;
  }

  submit() {
    if (this.checkPasswords()) {
      this.errMessage = 'Passwords must match';
      return;
    }
    // Also entered old password must be checked
    this.save();
  }
}
