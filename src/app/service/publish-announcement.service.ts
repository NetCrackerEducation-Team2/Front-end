import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Announcement} from '../models/announcement';
import {catchError, tap} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from "../../api-urls";

@Injectable({
  providedIn: 'root'
})
export class PublishAnnouncementService {
  private readonly ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS;
  private readonly ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS;

  constructor(private httpClient: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS = apiUrls.ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS;
    this.ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS = apiUrls.ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS;
  }

  publishAnnouncement(announcementId: number) {
    return this.httpClient.put<any>(this.ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS + announcementId, {})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('publishAnnouncement', [])));
  }

  unpublishedAnnouncement(announcementId: number): Observable<Announcement> {
    return this.httpClient.put<any>(this.ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS + announcementId, {})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('unpublishAnnouncement', [])));
  }
}
