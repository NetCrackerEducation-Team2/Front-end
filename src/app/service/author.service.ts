import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Author} from '../models/author';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ErrorHandlerService} from './logging/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.authorsUrl = environment.SERVER_DOMAIN + environment.SERVER_DOMAIN + environment.API_AUTHORS;
  }

  getAuthors(): Observable<Author[]> {
    //Get from mock
    //return of(AUTHORS)

    return this.http.get(this.authorsUrl)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAuthors', []))
      );
  }
}
