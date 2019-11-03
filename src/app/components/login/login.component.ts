import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: ''};
  isError = false;
  isLogin = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(JSON.stringify(this.user), ' submit');
    this.authService.authenticate(this.user.username, this.user.password)
      .subscribe(resp => {
          console.log(resp);
          this.isError = false;
          this.isLogin = true;
        },
        error => {
          this.isError = true;
          this.isLogin = false;
        }
      );
  }
}
