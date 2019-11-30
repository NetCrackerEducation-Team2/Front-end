import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Genre} from '../models/genre';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '../../api-urls';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl: string;
  private searchGenreUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.genresUrl = apiUrls.API_GENRES;
    this.searchGenreUrl = apiUrls.API_GENRES_URL.SEARCH_BY_NAME_SUBSTRING;
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get(this.genresUrl)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getGenres', []))
      );
  }
  searchGenres(contains: string): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.searchGenreUrl, {params: {contains}})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('searchGenres', []))
      );
  }
}
