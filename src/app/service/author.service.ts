import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Author} from "../models/author";
import {HttpClient} from "@angular/common/http";
import {LogService} from "./logging/log.service";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl: string;

  constructor(private http: HttpClient,
              private logger: LogService) {
    this.authorsUrl = environment.API_AUTHORS;
  }

  getAuthors(): Observable<Author[]> {
    //Get from mock
    //return of(AUTHORS)

    return this.http.get(this.authorsUrl)
      .pipe(
        catchError(this.handleError<any>('getAuthors', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
