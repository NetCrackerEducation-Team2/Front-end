import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Genre} from '../models/genre';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apiUrls} from '../../api-urls';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl: string;
  private searchPartGenreUrl: string;
  private searchGenreUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.genresUrl = apiUrls.API_GENRES;
    this.searchPartGenreUrl = apiUrls.API_GENRES_URL.SEARCH_PART_BY_NAME_SUBSTRING;
    this.searchGenreUrl = apiUrls.API_GENRES_URL.SEARCH_BY_NAME_SUBSTRING;
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get(this.genresUrl)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getGenres', []))
      );
  }

  searchPartGenres(contains: string, page: number): Observable<Genre[]> {
    let size = 10;
    let offset = page * size;
    let params = new HttpParams()
      .set('size', size.toString())
      .set('offset', offset.toString())
      .set('contains', contains ? contains : '');
    let paramsString = '?' + params.toString();
    return this.http.get(this.searchPartGenreUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('searchPartGenres', []))
      );
  }

  searchGenres(contains: string): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.searchGenreUrl, {params: {contains}})
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('searchGenres', []))
      );
  }
}
