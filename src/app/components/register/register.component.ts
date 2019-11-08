import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {fullName: '', email: '', password: ''};
  repeatPassword: '';

  isError: boolean;
  message: string;
  isRegistered: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.isRegistered = false;
    this.isError = false;
  }

  ngOnInit() {
  }

  checkPasswords(): boolean {
    return this.repeatPassword === this.user.password;
  }

  submit() {
    if (!this.checkPasswords()) {
      this.message = 'Passwords must match';
      this.isError = true;
      return;
    } else {
      this.message = '';
      this.isError = false;
    }
    this.register();
  }

  register() {
    this.authService.register(this.user.fullName, this.user.email, this.user.password)
      .subscribe(
        resp => {
          this.isError = false;
          this.isRegistered = true;
        },
        (err: HttpErrorResponse) => {
          this.isError = true;
          if (typeof err.error === 'string') {
            this.message = err.error;
          } else {
            this.message = 'Sorry, some unknown error occurred. Try again.';
           }
        }
      );
  }
}
