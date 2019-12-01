import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {Book} from '../models/book';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private readonly recommendationsUrl: string;
  private readonly prepareRecommendationsUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.recommendationsUrl = apiUrls.API_RECOMMENDATIONS;
    this.prepareRecommendationsUrl = apiUrls.API_PREPARE_RECOMMENDATIONS;
  }

  prepareRecommendations(userId: number, count: number): Observable<object>{
    let params = new HttpParams().set('count', count.toString());
    let paramsString = '?' + params.toString();
    return this.http.put(this.prepareRecommendationsUrl + userId + paramsString, null)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('prepareRecommendations', []))
      );
  }

  getRecommendations(userId: number, page: number, pageSize: number): Observable<Page<Book>[]>{
    let params = new HttpParams().set('pageSize', pageSize.toString());
    let paramsString = '?' + params.toString();
    return this.http.get(this.recommendationsUrl + userId + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getRecommendations', []))
      );
  }
}
