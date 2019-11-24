import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {UsersBook} from '../models/users-book';

@Injectable({
  providedIn: 'root'
})
export class UsersBooksService {

  usersBookUrl: string;

  constructor(private http: HttpClient,
              private logger: LogService) {
    this.usersBookUrl = environment.API_USERS_BOOKS;
  }

  getUsersBookPage(userId: number, page: number, pageSize: number): Observable<Page<UsersBook>> {
    const url = '/get-page-by-user/' + userId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<UsersBook>>(this.usersBookUrl + url);
  }
}
