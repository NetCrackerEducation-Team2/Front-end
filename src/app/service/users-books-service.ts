import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {UserBook} from '../models/users-book';
import {apiUrls} from '../../api-urls';
import {Book} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class UsersBooksService {

  userBookUrl: string;

  constructor(private http: HttpClient) {
    this.userBookUrl = apiUrls.API_USERS_BOOKS;
  }

  getUserBook(bookId: number, userId: number): Observable<UserBook> {
    const url = '/getUserBook?book=' + bookId + '&user=' + userId;
    return this.http.get<UserBook>(this.userBookUrl + url);
  }

  getUsersBookPage(userId: number, page: number, pageSize: number): Observable<Page<UserBook>> {
    const url = '/get-page-by-user/' + userId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<UserBook>>(this.userBookUrl + url);
  }

  addUsersBook(book: Book, userId: number): Observable<UserBook> {
    const url = '/addUserBook?book=' + book.bookId + '&user=' + userId;
    console.log(this.userBookUrl + url);
    return this.http.put<UserBook>(this.userBookUrl + url, '');
  }

  deleteUsersBook(usersBookId: number): Observable<any> {
    const url = '/deleteUserBook?userBook=' + usersBookId;
    console.log(this.userBookUrl + url);
    return this.http.put<UserBook>(this.userBookUrl + url, '');
  }

  setReadMark(usersBookId: number, value: boolean): Observable<UserBook> {
    const url = '/markReadUserBook?userBook=' + usersBookId + '&value=' + value;
    return this.http.put<UserBook>(this.userBookUrl + url, '');
  }

  setFavoriteMark(usersBookId: number, value: boolean): Observable<UserBook> {
    const url = '/markFavoriteUserBook?userBook=' + usersBookId + '&value=' + value;
    return this.http.put<UserBook>(this.userBookUrl + url, '');
  }
}
