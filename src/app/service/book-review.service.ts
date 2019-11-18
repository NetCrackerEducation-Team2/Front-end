import {Injectable} from "@angular/core";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {BookReview} from "../models/book-review";
import {BookOverview} from "../models/book-overview";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {BookReviewComment} from "../models/book-review-comment";

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {
  bookReviewUrl: string;

  constructor(private http: HttpClient) {
    this.bookReviewUrl = environment.API_BOOK_REVIEW;
  }

  getBookReview(bookId: number, page: number, pageSize: number): Observable<BookReview[]> {
    const url = "/all/" + bookId + "?page=" + page + "&pageSize=" + pageSize;
    return this.http.get<BookReview[]>(this.bookReviewUrl + url);
  }

  // getBookReviewComment(BookReviewId: number, page: number, pageSize: number): Observable<BookReviewComment[]> {
  //   const url = "?page=" + page + "&pageSize=" + pageSize;
  //   alert(url);
  //   return this.http.get<BookReviewComment[]>(this.bookReviewUrl + url)
  //     .pipe(
  //       catchError(this.handleError<any>('getBookReview', BookReviewComment))
  //     );
  // }

}
