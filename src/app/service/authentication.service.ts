import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

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
  private readonly AUTH_ACTIVATION_URL;

  constructor(private httpClient: HttpClient) {
    this.AUTH_LOGIN_URL = environment.AUTH_LOGIN_URL;
    this.AUTH_REG_URL = environment.AUTH_REGISTER_URL;
    this.AUTH_ACTIVATION_URL = environment.AUTH_ACTIVATION_URL;
  }

  authenticate(email, password): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_LOGIN_URL, JSON.stringify({email, password}));
  }

  register(fullName, email, password): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_REG_URL, {fullName, email, password});
  }

  sendActivationCode(code: string): Observable<any> {
    return this.httpClient.get(this.AUTH_ACTIVATION_URL + code);
  }
}
