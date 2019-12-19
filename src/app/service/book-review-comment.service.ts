import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {BookReviewComment} from '../models/book-review-comment';
import {apiUrls} from '../../api-urls';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookReviewCommentService {
  bookReviewUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.bookReviewUrl = apiUrls.API_BOOK_REVIEW;
  }

  getBookReviewComments(bookId: number, page: number, pageSize: number): Observable<Page<BookReviewComment>> {
    const url = '/comment/all/' + bookId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<BookReviewComment>>(this.bookReviewUrl + url)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getUserBook', []))
      );
  }

  addReviewComment(newComment: BookReviewComment): Observable<BookReviewComment> {
    const url = '/comment/add/';
    return this.http.post<BookReviewComment>(this.bookReviewUrl + url, newComment)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getUserBook', []))
      );
  }
}
