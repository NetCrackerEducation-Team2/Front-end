import { Injectable } from '@angular/core';
import {BookService} from './book.service';
import {BookOverview} from '../models/book-overview';
import {Observable} from 'rxjs';
import {ErrorHandlerService} from './logging/error-handler.service';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../models/page';
import {environment} from '../../environments/environment';
import {CheckPaginationService} from './check-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class BookOverviewService {

  private readonly overviewsUrl: string;
  private readonly bookOverviewsByBookUrl: string;
  private readonly publishedBookOverviewUrl: string;

  constructor(private http: HttpClient,
              private checkPaginationService: CheckPaginationService,
              private bookService: BookService,
              private errorHandlerService: ErrorHandlerService) {
    this.bookOverviewsByBookUrl = environment.API_BOOK_OVERVIEWS_BY_BOOK;
    this.publishedBookOverviewUrl = environment.API_PUBLISHED_BOOK_OVERVIEW;
    this.overviewsUrl = environment.API_OVERVIEWS;
  }

  getBookOverviewsByBook(bookId: number, page: number, pageSize: number): Observable<Page<BookOverview>> {
    let paramsString: string;
    paramsString = this.checkPaginationService.checkPagination(page, pageSize);
    return this.http.get(this.bookOverviewsByBookUrl + bookId + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getBookOverviewsByBook', []))
      );
  }

  getAllBooksOverviews(page: number, pageSize: number): Observable<any> {
    let paramsString: string;
    paramsString = this.checkPaginationService.checkPagination(page, pageSize);
    return this.http.get(this.overviewsUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAllBookOverviews', []))
      );
  }

  getPublishedBookOverview(bookId: number): Observable<BookOverview> {
    return this.http.get(this.publishedBookOverviewUrl + bookId)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getPublishedBookOverview', []))
      );
  }
}
