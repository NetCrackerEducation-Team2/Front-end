import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

export class User {
  constructor(public status: string) {
  }
}

export class JwtResponse {
  constructor(public jwttoken: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly AUTH_LOGIN_URL;
  private readonly AUTH_REG_URL;

  constructor(private httpClient: HttpClient) {
    this.AUTH_LOGIN_URL = environment.AUTH_LOGIN_URL;
    this.AUTH_REG_URL = environment.AUTH_REGISTER_URL;
  }

  authenticate(email, password) {
    return this.httpClient.post<any>(this.AUTH_LOGIN_URL, JSON.stringify({email, password})).pipe(
      map(
        data => {
          localStorage.setItem('token', data.token);
        }
      )
    );
  }

  register(email, password) {
    return this.httpClient.post<any>(this.AUTH_REG_URL, {email, password});
  }
}
