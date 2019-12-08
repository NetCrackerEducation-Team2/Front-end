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
  isDownloading: boolean;

  isError: boolean;
  message: string;
  isRegistered: boolean;
  resolvedCaptcha: boolean;
  siteKey: string;

  constructor(private authService: AuthenticationService) {
    this.isError = this.resolvedCaptcha = this.isRegistered = false;
    this.siteKey = '6LdAsMYUAAAAACmTbwvEd_H-nE9jnhVRF_zoo7WQ';
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
    // this.register();
  }

  register() {
    this.isDownloading = true;
    this.authService.register(this.user.fullName, this.user.email, this.user.password)
      .subscribe(
        resp => {
          this.isRegistered = true;
          console.log(this.isRegistered);
          this.isError = false;
        },
        (err: any) => {
          console.log('Error', err);
          this.isError = true;
          if (typeof err.error === 'string') {
            this.message = err.error;
          } else {
            this.message = 'Sorry, some unknown error occurred. Try again.';
          }
          this.isDownloading = false;
        },
        () => this.isDownloading = false
      );
  }
}
