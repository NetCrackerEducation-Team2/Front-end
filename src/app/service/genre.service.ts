import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Genre} from "../models/genre";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {LogService} from "./logging/log.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl: string;

  constructor(private http: HttpClient,
              private logger: LogService) {
    this.genresUrl = environment.API_GENRES;
  }

  getGenres(): Observable<Genre[]>{
    //Get from mock
    //return of(GENRES);

    return this.http.get(this.genresUrl)
      .pipe(
        catchError(this.handleError<any>('getGenres', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
