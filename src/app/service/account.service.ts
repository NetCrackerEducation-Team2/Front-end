import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_PROFILE;

  constructor(private http: HttpClient) {
    this.API_PROFILE = 'http://localhost:8081/profile/';
  }

  getUserById(userId): Observable<any> {
    return this.http.get(this.API_PROFILE + userId);
  }

  getToken() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    } else {
      return null;
    }

  }



}
