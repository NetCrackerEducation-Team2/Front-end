import { Injectable } from '@angular/core';
import {BookService} from "./book.service";
import {BookOverview} from "../models/book-overview";
import {Observable} from "rxjs";
import {ErrorHandlerService} from "./logging/error-handler.service";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Page} from "../models/page";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookOverviewService {

  private readonly bookOverviewsByBookUrl: string;
  private readonly publishedBookOverviewUrl: string;

  constructor(private http: HttpClient,
              private bookService: BookService,
              private errorHandlerService: ErrorHandlerService) {
    this.bookOverviewsByBookUrl = environment.API_BOOK_OVERVIEWS_BY_BOOK;
    this.publishedBookOverviewUrl = environment.API_PUBLISHED_BOOK_OVERVIEW;
  }

  getBookOverviewsByBook(bookId: number, page: number, pageSize: number): Observable<Page<BookOverview>>{
    let params = new HttpParams();
    let paramsString: string = "";
    if(page != null){
      params = params.set('page', page.toString());
    }
    if(pageSize != null){
      params = params.set('pageSize', pageSize.toString());
    }
    if(params.keys().length > 0){
      paramsString = "?" + params.toString();
    }
    return this.http.get(this.bookOverviewsByBookUrl + bookId + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getBookOverviewsByBook', []))
      );
  }

  getPublishedBookOverview(bookId: number): Observable<BookOverview>{
    return this.http.get(this.publishedBookOverviewUrl + bookId)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getPublishedBookOverview', []))
      );
  }
}
