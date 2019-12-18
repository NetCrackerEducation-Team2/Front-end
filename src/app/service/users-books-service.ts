import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {UserBook} from '../models/users-book';
import {apiUrls} from '../../api-urls';
import {Book} from '../models/book';
import {StringFormatterService} from './string-formatter.service';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {UserBookFilteringParam} from '../models/user-book-filtering-param';

@Injectable({
  providedIn: 'root'
})
export class UsersBooksService {

  userBookUrl: string;

  constructor(private http: HttpClient,
              private stringFormatterService: StringFormatterService,
              private errorHandlerService: ErrorHandlerService) {
    this.userBookUrl = apiUrls.API_USERS_BOOKS;
  }

  getUserBook(bookId: number, userId: number): Observable<UserBook> {
    const url = '/getUserBook?book=' + bookId + '&user=' + userId;
    return this.http.get<UserBook>(this.userBookUrl + url)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getUserBook', []))
      );
  }

  getFilteredUserBook(filteringParams: Map<UserBookFilteringParam, any>, page: number, pageSize: number): Observable<Page<UserBook>> {
    let params = new HttpParams();
    let paramsString = '';
    if (filteringParams.get(UserBookFilteringParam.UserId) != null) {
      const userId = filteringParams.get(UserBookFilteringParam.UserId);
      params = params.set('userId', userId);
    }
    if (filteringParams.get(UserBookFilteringParam.Title) != null) {
      const title = filteringParams.get(UserBookFilteringParam.Title);
      params = params.set('title', title);
    }
    if (filteringParams.get(UserBookFilteringParam.Author) != null) {
      const author = filteringParams.get(UserBookFilteringParam.Author);
      params = params.set('authorId', author.authorId.toString());
    }
    if (filteringParams.get(UserBookFilteringParam.Genre) != null) {
      const genre = filteringParams.get(UserBookFilteringParam.Genre);
      params = params.set('genreId', genre.genreId.toString());
    }
    if (filteringParams.get(UserBookFilteringParam.AnnouncementDate) != null) {
      const announcementDate = filteringParams.get(UserBookFilteringParam.AnnouncementDate);
      console.log(announcementDate);
      params = params.set('date', this.stringFormatterService.formatDate(announcementDate));
    }
    if (filteringParams.get(UserBookFilteringParam.ReadMark) != null) {
      const readMark = filteringParams.get(UserBookFilteringParam.ReadMark);
      params = params.set('readMark', readMark);
    }
    if (filteringParams.get(UserBookFilteringParam.FavoriteMark) != null) {
      const favoriteMark = filteringParams.get(UserBookFilteringParam.FavoriteMark);
      params = params.set('favoriteMark', favoriteMark);
    }
    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (pageSize != null) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    console.log(paramsString);
    return this.http.get(this.userBookUrl + '/getFilteredUserBook' + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getFilteredUserBook', []))
      );
  }

  getUsersBookPage(userId: number, page: number, pageSize: number): Observable<Page<UserBook>> {
    const url = '/get-page-by-user/' + userId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<UserBook>>(this.userBookUrl + url)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getUsersBookPage', []))
      );
  }

  addUsersBook(book: Book, userId: number): Observable<UserBook> {
    const url = '/addUserBook?book=' + book.bookId + '&user=' + userId;
    return this.http.put<UserBook>(this.userBookUrl + url, '')
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('addUsersBook', []))
      );
  }

  deleteUsersBook(usersBookId: number): Observable<any> {
    const url = '/deleteUserBook?userBook=' + usersBookId;
    console.log(this.userBookUrl + url);
    return this.http.put<UserBook>(this.userBookUrl + url, '')
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('deleteUsersBook', []))
      );
  }

  setReadMark(usersBookId: number, value: boolean): Observable<UserBook> {
    const url = '/markReadUserBook?userBook=' + usersBookId + '&value=' + value;
    return this.http.put<UserBook>(this.userBookUrl + url, '')
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('setReadMark', []))
      );
  }

  setFavoriteMark(usersBookId: number, value: boolean): Observable<UserBook> {
    const url = '/markFavoriteUserBook?userBook=' + usersBookId + '&value=' + value;
    return this.http.put<UserBook>(this.userBookUrl + url, '')
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('setFavoriteMark', []))
      );
  }
}
