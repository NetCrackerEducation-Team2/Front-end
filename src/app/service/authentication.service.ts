import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly AUTH_LOGIN_URL;
  private readonly AUTH_REG_URL;
  private readonly AUTH_ACTIVATION_URL;
  private readonly AUTH_RECOVER_LINK_URL;
  private readonly AUTH_RECOVER_PASS_URL;

  constructor(private httpClient: HttpClient) {
    this.AUTH_LOGIN_URL = environment.SERVER_DOMAIN + environment.AUTH_LOGIN_URL;
    this.AUTH_REG_URL = environment.SERVER_DOMAIN + environment.AUTH_REGISTER_URL;
    this.AUTH_ACTIVATION_URL = environment.SERVER_DOMAIN + environment.AUTH_ACTIVATION_URL;
    this.AUTH_RECOVER_LINK_URL = environment.SERVER_DOMAIN + environment.AUTH_RECOVER_LINK_URL;
    this.AUTH_RECOVER_PASS_URL = environment.SERVER_DOMAIN + environment.AUTH_RECOVER_PASS_URL;
  }

  authenticate(email, password): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_LOGIN_URL, JSON.stringify({email, password}));
  }

  register(fullName, email, password): Observable<any> {
    console.log(fullName, email, password);
    return this.httpClient.post<any>(this.AUTH_REG_URL, {fullName, email, password});
  }

  sendActivationCode(code: string): Observable<any> {
    return this.httpClient.get(this.AUTH_ACTIVATION_URL + code);
  }

  getRecoveryCode(email: string): Observable<any> {
    return this.httpClient.get(this.AUTH_RECOVER_LINK_URL + email);
  }

  getRecoveryPassword(link: string): Observable<any> {
    return this.httpClient.get(this.AUTH_RECOVER_PASS_URL + link);
  }
}
