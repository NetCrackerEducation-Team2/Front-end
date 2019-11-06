import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class User {
  constructor(
    public status: string,
  ) {
  }
}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  // all constants below should be in /environments directory
  private readonly ROOT = 'http://localhost:';
  private readonly PORT = 8081;
  private readonly ENDPOINT = '/auth/login';

  private readonly AUTH_LOGIN_URL = this.ROOT + this.PORT + this.ENDPOINT;

  authenticate(username, password) {
    return this.httpClient.post<any>(this.AUTH_LOGIN_URL, JSON.stringify({username, password})).pipe(
      map(
        data => {
          localStorage.setItem('token', data.token);
        }
      )
    );
  }

  isUserLoggedIn() {
    // tslint:disable-next-line:prefer-const
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
