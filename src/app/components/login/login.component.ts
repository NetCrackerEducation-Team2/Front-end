import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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
    console.log(JSON.stringify(this.user.email), ' submitted');
    this.authService.authenticate(this.user.email, this.user.password)
      .subscribe(
        (resp) => {
          const currentUser = {token: resp.token, userId: resp.userId};
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.router.navigate(['/profile', currentUser.userId]);
          console.log('Successfully signed in');
          this.isError = false;
          this.isLogin = true;
        },
        (error: HttpErrorResponse) => {
          this.isError = true;
          this.isLogin = false;
        }
      )
    ;
  }
}
