import {Injectable} from '@angular/core';
import {LogService} from './logging/log.service';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Author} from '../models/author';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './logging/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl: string;
  private findAuthorByFullNameContains: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.authorsUrl = environment.API_AUTHORS;
    this.findAuthorByFullNameContains = environment.API_AUTHORS_URL.FIND_URL;
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get(this.authorsUrl)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAuthors', []))
      );
  }

  findAuthors(contains: string): Observable<Author[]> {
    return this.http.get<Author[]>(this.findAuthorByFullNameContains, {params: {contains}})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('findAuthors', []))
      );
  }
}
