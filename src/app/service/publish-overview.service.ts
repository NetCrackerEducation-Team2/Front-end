import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BookOverview} from '../models/book-overview';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PublishOverviewService {
  private readonly ADMIN_MODERATOR_PUBLISH_OVERVIEW;
  private readonly ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW;


  constructor(private httpClient: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.ADMIN_MODERATOR_PUBLISH_OVERVIEW = environment.ADMIN_MODERATOR_PUBLISH_OVERVIEW;
    this.ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW = environment.ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW;
  }
  publishOverview(bookOverviewId: number): Observable<BookOverview> {
    return this.httpClient.put<any>(this.ADMIN_MODERATOR_PUBLISH_OVERVIEW + bookOverviewId, {})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('publishBookOverview', [])));
  }

  unpublishedOverview(bookOverviewId: number): Observable<BookOverview> {
    return this.httpClient.put<any>(this.ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW + bookOverviewId, {})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('unpublishBookOverview', [])));
  }
}
