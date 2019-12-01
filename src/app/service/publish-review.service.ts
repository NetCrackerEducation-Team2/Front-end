import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookReview} from '../models/book-review';
import {ErrorHandlerService} from './error-handler.service';
import {catchError} from 'rxjs/operators';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class PublishReviewService {
  private readonly ADMIN_MODERATOR_PUBLISH_REVIEW;
  private readonly ADMIN_MODERATOR_UNPUBLISHED_REVIEW;

  constructor(private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
    this.ADMIN_MODERATOR_PUBLISH_REVIEW = apiUrls.ADMIN_MODERATOR_PUBLISH_REVIEW;
    this.ADMIN_MODERATOR_UNPUBLISHED_REVIEW = apiUrls.ADMIN_MODERATOR_UNPUBLISHED_REVIEW;
  }

  publishReview(bookReviewId: number): Observable<BookReview> {
    return this.httpClient.put<any>(this.ADMIN_MODERATOR_PUBLISH_REVIEW + bookReviewId, {})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('publishBookReview', [])));
  }

  unpublishedReview(bookReviewId: number): Observable<BookReview> {
    return this.httpClient.put<any>(this.ADMIN_MODERATOR_UNPUBLISHED_REVIEW + bookReviewId, {})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('unpublishBookReview', [])));
  }
}
