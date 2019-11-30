import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {Book} from '../models/book';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private readonly getRecommendationsUrl: string;
  private readonly prepareRecommendationsUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.getRecommendationsUrl = environment.API_GET_RECOMMENDATIONS_URL;
    this.prepareRecommendationsUrl = environment.API_PREPARE_RECOMMENDATIONS_URL;
  }

  prepareRecommendations(userId: number, count: number): void{
    this.http.put(this.prepareRecommendationsUrl + userId + '/' + count, null)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('prepareRecommendations', []))
      );
  }

  getRecommendations(userId: number, page: number, pageSize: number): Observable<Page<Book>>{
    let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
    let paramsString = '?' + params.toString();
    return this.http.get(this.getRecommendationsUrl + userId + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getRecommendations', []))
      );
  }
}
