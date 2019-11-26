import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class PublishOverviewService {
  private readonly ADMIN_MODERATOR_PUBLISH_OVERVIEW;
  private readonly ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW;

  constructor(private httpClient: HttpClient) {
    this.ADMIN_MODERATOR_PUBLISH_OVERVIEW = apiUrls.ADMIN_MODERATOR_PUBLISH_OVERVIEW;
    this.ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW = apiUrls.ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW;
  }
  publishOverview(bookId: number): Observable<any> {
    return this.httpClient.post<any>(this.ADMIN_MODERATOR_PUBLISH_OVERVIEW, {bookId});
  }

  unpublishedOverview(bookId: number): Observable<any> {
    return this.httpClient.post<any>(this.ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW, {bookId});
  }
}
