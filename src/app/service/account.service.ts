import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {apiUrls} from '../../api-urls';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_PROFILE;

  constructor(private http: HttpClient) {
    this.API_PROFILE = apiUrls.API_PROFILE;
  }

  getUserById(userId): Observable<User> {
    return this.http.get<User>(this.API_PROFILE + '/' + userId);
  }

  updateUser(newUser: User) {
    const currUser = this.getCurrentUser();
    newUser.userId = currUser.userId;
    newUser.enabled = currUser.enabled;
    console.log('newUser', JSON.stringify(newUser));
    console.log('currUser', JSON.stringify(currUser));
    return this.http.put(this.API_PROFILE + '/update', [currUser, newUser]);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(this.API_PROFILE + `/change-password/${this.getCurrentUser().userId}`, {
      oldPassword,
      newPassword
    });
  }

  getToken() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      try {
        return JSON.parse(localStorage.getItem('currentUser')).token;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }



}
