import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {register} from 'ts-node';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {fullName: '', email: '', password: ''};
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
    register();
  }

  register() {
    this.authService.register(this.user.fullName, this.user.password);
  }


    // to be fixed, using merge operator
    // this.authService.register((this.user as any).username, this.user.password)
    //   .subscribe(
    //     resp => {
    //       console.log('register ', this.user);
    //       this.authService.authenticate((this.user as any).username, this.user.password)
    //         .subscribe(
    //           res => {
    //             this.isError = false;
    //             this.isRegister = true;
    //           }
    //         );
    //       this.message = '';
    //     },
    //     err => {
    //       this.isError = true;
    //       this.isRegister = false;
    //       this.message = '';
    //     }
    //   );
}
