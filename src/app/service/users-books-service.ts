import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {UsersBook} from '../models/users-book';
import {apiUrls} from '../../api-urls';
import {Book} from '../models/book';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersBooksService {

  usersBookUrl: string;

  constructor(private http: HttpClient) {
    this.usersBookUrl = apiUrls.API_USERS_BOOKS;
  }

  getUsersBookPage(userId: number, page: number, pageSize: number): Observable<Page<UsersBook>> {
    const url = '/get-page-by-user/' + userId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<UsersBook>>(this.usersBookUrl + url);
  }

  addUsersBook(book: Book, userId: number): Observable<UsersBook> {
    const url = '/addUserBook?book=' + book.bookId + '&user=' + userId;
    return this.http.put<UsersBook>(this.usersBookUrl + url, '');
  }

  deleteUsersBook(usersBookId: number): void {
    const url = '/deleteUserBook?userBook=' + usersBookId;
    this.http.put<UsersBook>(this.usersBookUrl + url, '');
  }

  setReadMark(usersBookId: number, value: boolean): Observable<UsersBook> {
    const url = '/markReadUserBook?userBook=' + usersBookId + '&value=' + value;
    return this.http.put<UsersBook>(this.usersBookUrl + url, '');
  }

  setFavoriteMark(usersBookId: number, value: boolean): Observable<UsersBook> {
    const url = '/markFavoriteUserBook?userBook=' + usersBookId + '&value=' + value;
    return this.http.put<UsersBook>(this.usersBookUrl + url, '');
  }
}
