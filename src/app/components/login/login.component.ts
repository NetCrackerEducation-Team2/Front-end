import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {State} from '../../state/app.state';
import {Store} from '@ngrx/store';
import {LOGIN} from '../../state/app.action';
import {take} from 'rxjs/operators';


@Component({
  selector: ' app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {email: '', password: ''};
  isError = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(JSON.stringify(this.user.email), ' submitted');
    this.authService.authenticate(this.user.email, this.user.password)
    .pipe(take(1)).subscribe(
        (resp) => {
          const currentUser = {
            token: resp.token,
            userId: resp.user.userId,
            fullName: resp.user.fullName,
            enabled: resp.user.enabled,
            email: resp.user.email,
            roles: JSON.parse(JSON.stringify((jwt_decode(resp.token)))).rol
          };

          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          console.log(JSON.stringify(currentUser));
          this.router.navigate(['/profile', currentUser.userId]);
          console.log(currentUser);
          console.log('Successfully signed in');
          this.isError = false;
          this.store.dispatch(new LOGIN(currentUser));
        },
        (error: HttpErrorResponse) => {
          this.isError = true;
        }
      )
    ;

  }

}




