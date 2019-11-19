import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Genre} from "../models/genre";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ErrorHandlerService} from "./logging/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.genresUrl = environment.API_GENRES;
  }

  getGenres(): Observable<Genre[]>{
    //Get from mock
    //return of(GENRES);

    return this.http.get(this.genresUrl)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getGenres', []))
      );
  }
}
