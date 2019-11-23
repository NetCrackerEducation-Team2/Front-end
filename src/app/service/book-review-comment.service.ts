import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {BookReviewComment} from '../models/book-review-comment';

@Injectable({
  providedIn: 'root'
})
export class BookReviewCommentService {
  bookReviewUrl: string;

  constructor(private http: HttpClient) {
    this.bookReviewUrl = environment.SERVER_DOMAIN + environment.API_BOOK_REVIEW;
  }

  getBookReviewComments(bookId: number, page: number, pageSize: number): Observable<Page<BookReviewComment>> {
    const url = '/comment/all/' + bookId + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<Page<BookReviewComment>>(this.bookReviewUrl + url);
  }
}
