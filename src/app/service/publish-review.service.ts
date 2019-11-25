import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishReviewService {
  private readonly ADMIN_MODERATOR_PUBLISH_REVIEW;
  private readonly ADMIN_MODERATOR_UNPUBLISHED_REVIEW;

  constructor(private httpClient: HttpClient) {
    this.ADMIN_MODERATOR_PUBLISH_REVIEW = environment.ADMIN_MODERATOR_PUBLISH_REVIEW;
    this.ADMIN_MODERATOR_UNPUBLISHED_REVIEW = environment.ADMIN_MODERATOR_UNPUBLISHED_REVIEW;
  }

  publishReview(bookId: number): Observable<any> {
    return this.httpClient.post<any>(this.ADMIN_MODERATOR_PUBLISH_REVIEW, {bookId});
  }

  unpublishedReview(bookId: number): Observable<any> {
    return this.httpClient.post<any>(this.ADMIN_MODERATOR_UNPUBLISHED_REVIEW, {bookId});
  }
}
