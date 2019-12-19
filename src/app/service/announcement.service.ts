import {Injectable} from '@angular/core';
import {Announcement} from '../models/announcement';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrls} from '../../api-urls';
import {CheckPaginationService} from './check-pagination.service';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private readonly announcementsUrl: string;
  private readonly publishedAnnouncementsUrl: string;
  private readonly getPublishedAnnouncementByDateUrl: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private checkPaginationService: CheckPaginationService,
              private errorHandlerService: ErrorHandlerService
  ) {

    this.announcementsUrl = apiUrls.API_ANNOUNCEMENTS;
    this.publishedAnnouncementsUrl = apiUrls.API_PUBLISHED_ANNOUNCEMENTS;
    this.getPublishedAnnouncementByDateUrl = apiUrls.API_GET_PUBLISHED_ANNOUNCEMENT_BY_DATE;
  }

  getAnnouncements(page: number, pageSize: number): Observable<any> {
    let paramsString: string;
    paramsString = this.checkPaginationService.checkPagination(page, pageSize);

    return this.http.get(this.announcementsUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAnnouncements', []))
      );
  }


  getPublishedAnnouncements(page: number, pageSize: number): Observable<any> {
    let paramsString: string;
    paramsString = this.checkPaginationService.checkPagination(page, pageSize);
    console.log(this.publishedAnnouncementsUrl + paramsString);
    return this.http.get(this.publishedAnnouncementsUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getPublishAnnouncements', []))
      );
  }

  getAnnouncement(id: number): Observable<Announcement> {
    return this.http.get(this.announcementsUrl + id)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAnnouncements', []))
      );
  }

  getPublishedAnnouncementByDate(date: string): Observable<Announcement> {
    return this.http.get(this.getPublishedAnnouncementByDateUrl + date)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAnnouncements', []))
      );
  }

  createAnnouncement(title, description, userId): Observable<Announcement> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Announcement>(this.announcementsUrl, JSON.stringify({title, description, userId}), {headers})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('Adding announcement', null))
      );
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  /*
  Handle Http operation that failed.
  Let the app continue.
  @param operation - name of the operation that failed
  @param result - optional value to return as the observable result
 */
}
