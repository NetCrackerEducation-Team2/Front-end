import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Page} from '../models/page';
import {apiUrls} from 'src/api-urls';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_PROFILE;
  private readonly API_SEARCH_USERS;

  constructor(private http: HttpClient) {
    this.API_SEARCH_USERS = apiUrls.API_USERS.SEARCH_USERS_URL;
    this.API_PROFILE = apiUrls.API_PROFILE;

  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.API_PROFILE + '/' + userId);
  }

  searchUsers(searchExpression: string, page: number, pageSize: number): Observable<Page<User>> {
    if (pageSize && page) {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
        .set('searchExpression', searchExpression);
      return this.http.get<Page<User>>(this.API_SEARCH_USERS, {params});
    } else {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
        .set('searchExpression', searchExpression);
      return this.http.get<Page<User>>(this.API_SEARCH_USERS, {params});
    }
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

  getCurrentUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      return JSON.parse(JSON.stringify((jwt_decode(token)))).rol;
    } else {
      return null;
    }
  }
}
