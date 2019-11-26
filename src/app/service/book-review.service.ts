import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BookReview} from '../models/book-review';
import {BookOverview} from '../models/book-overview';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BookReviewComment} from '../models/book-review-comment';
import {Page} from '../models/page';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {
  bookReviewUrl: string;

  constructor(private http: HttpClient) {
    this.bookReviewUrl = apiUrls.API_BOOK_REVIEW;
  }

  getBookReview(bookId: number, page: number, pageSize: number): Observable<Page<BookReview>> {
    const url = '/all/' + bookId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<BookReview>>(this.bookReviewUrl + url);
  }

}
