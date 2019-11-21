import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { ANNOUNCEMENTS } from '../mocks/mock-announcement';
import { Observable, of  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private readonly announcementsUrl:string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    //this.announcemetnsUrl = 'http://localhost:8081/api/announcements';
    this.announcementsUrl = environment.API_ANNOUNCEMENTS;
  }

  getAnnouncements(page: number, pageSize: number): Observable<any> {
    // Get from mock
  //  return of(ANNOUNCEMENTS);
    // Get from backend
    let params = new HttpParams();
    let paramsString: string = "";
    if(page != null){
      params = params.set('page', page.toString());
    }
    if(pageSize != null){
      params = params.set('pageSize', pageSize.toString());
    }
    if(params.keys().length > 0){
      paramsString = "?" + params.toString();
    }
    return this.http.get(this.announcementsUrl + paramsString)
    .pipe(
      catchError(this.handleError<any>('getAnnouncements', []))
    );
  }

  getAnnouncement(id: number): Observable<Announcement> {
    // Get from mock
    //return of(ANNOUNCEMENTS.find(announcement => announcement.announcementId === id));
    //Return from backend
    return this.http.get(this.announcementsUrl + id)
    .pipe(
      catchError(this.handleError<any>('getAnnouncements', []))
    );
  }


  /*
  Handle Http operation that failed.
  Let the app continue.
  @param operation - name of the operation that failed
  @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
