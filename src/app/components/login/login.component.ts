import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {email: '', password: ''};
  isError = false;
  isLogin = false;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(JSON.stringify(this.user), ' submit');
    this.authService.authenticate(this.user.email, this.user.password)
      .subscribe(
        (resp) => {
          console.log('response from server', JSON.stringify(resp));
          // localStorage.setItem('token', resp.token);
          this.router.navigate(['/profile']);
          console.log('Successfully signed in');
          this.isError = false;
          this.isLogin = true;
        },
        (error: HttpErrorResponse) => {
          this.isError = true;
          this.isLogin = false;
        }
      );
  }
}
