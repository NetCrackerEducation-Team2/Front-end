import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../models/user";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_PROFILE;

  constructor(private http: HttpClient) {
    this.API_PROFILE = environment.API_PROFILE;
  }

  getUserById(userId): Observable<any> {
    return this.http.get(this.API_PROFILE + '/' + userId);
  }

  getToken() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    } else {
      return null;
    }
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
