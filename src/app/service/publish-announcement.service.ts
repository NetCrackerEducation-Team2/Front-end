import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class PublishAnnouncementService {
  private readonly ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS;
  private readonly ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS;

  constructor(private httpClient: HttpClient) {
    this.ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS = apiUrls.ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS;
    this.ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS = apiUrls.ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS;
  }
  publishAnnouncement(bookId: number): Observable<any> {
    return this.httpClient.post<any>(this.ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS, {bookId});
  }

  unpublishedAnnouncement(bookId: number): Observable<any> {
    return this.httpClient.post<any>(this.ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS, {bookId});
  }
}