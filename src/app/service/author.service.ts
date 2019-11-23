import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Author} from '../models/author';
import {HttpClient} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl: string;
  private findAuthorByFullNameContains: string;

  constructor(private http: HttpClient,
              private logger: LogService) {
    this.authorsUrl = environment.API_AUTHORS;
    this.findAuthorByFullNameContains = environment.API_AUTHORS_URL.FIND_URL;
  }

  getAuthors(): Observable<Author[]> {
    // Get from mock
    // return of(AUTHORS)

    return this.http.get<Author[]>(this.authorsUrl)
      .pipe(
        catchError(this.handleError<any>('getAuthors', []))
      );
  }

  findAuthors(contains: string): Observable<Author[]> {
    return this.http.get<Author[]>(this.findAuthorByFullNameContains, {params: {contains}})
      .pipe(
        catchError(this.handleError<any>('findAuthors', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
