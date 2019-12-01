import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {AppState} from '../../state/app.state';
import {Store} from '@ngrx/store';
import {LOGIN} from '../../state/app.action';


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
              private store: Store<AppState>) {
  }

  ngOnInit() {
  }


  submit() {
    console.log(JSON.stringify(this.user.email), ' submitted');
    this.authService.authenticate(this.user.email, this.user.password)
      .subscribe(
        (resp) => {
          const currentUser = {
            token: resp.token,
            userId: resp.user.userId,
            fullName: resp.user.fullName,
            enabled: resp.user.enabled,
            email: resp.user.email
          };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          console.log(JSON.stringify(currentUser));
          this.router.navigate(['/profile', currentUser.userId]);

          console.log('Successfully signed in');
          this.isError = false;
          const a = JSON.parse(JSON.stringify((jwt_decode(resp.token))));
        //  this.store.dispatch({type: APP_ACTION.APP_LOGIN }); add supp func
          for (const s of a.rol) {
            this.store.dispatch(new LOGIN(s));
          }

         // this.store.select('appReducer').subscribe(reducer => {console.log("login",reducer.login);});

        },
        (error: HttpErrorResponse) => {
          this.isError = true;
        }
      )
    ;

  }

}




