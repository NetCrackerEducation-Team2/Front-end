import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Author} from '../models/author';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl: string;
  private findPartAuthorByFullNameContains: string;
  private findAuthorByFullNameContains: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.authorsUrl = apiUrls.API_AUTHORS;
    this.findPartAuthorByFullNameContains = apiUrls.API_AUTHORS_URL.FIND_PART_URL;
    this.findAuthorByFullNameContains = apiUrls.API_AUTHORS_URL.FIND_URL;
  }

  findPartAuthors(contains: string, page: number): Observable<Author[]>{
    let size = 10;
    let offset = page * size;
    let params = new HttpParams()
      .set('size', size.toString())
      .set('offset', offset.toString())
      .set('contains', contains ? contains : '');
    let paramsString = '?' + params.toString();
    return this.http.get(this.findPartAuthorByFullNameContains + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('findPartAuthors', []))
      );
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
