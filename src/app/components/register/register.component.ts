import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {username: '', password: ''};
  repeatPassword: '';

  isRegister = false;
  isError = false;
  message: string;
  disabledSubmit = true;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.repeatPassword !== this.user.password) {
      this.message = 'Passwords must match';
      this.isError = true;
      return;
    } else {
      this.message = '';
      this.isError = false;
    }
    this.authService.register(this.user.username, this.user.password)
      .subscribe(
        resp => {
          console.log('register ', this.user);
          this.authService.authenticate(this.user.username, this.user.password)
            .subscribe(
              res => {
                this.isError = false;
                this.isRegister = true;
              }
            );
          this.message = '';
        },
        err => {
          this.isError = true;
          this.isRegister = false;
          this.message = '';
        }
      );
  }
}
