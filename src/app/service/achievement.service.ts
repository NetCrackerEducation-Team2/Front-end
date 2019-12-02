import {apiUrls} from '../../api-urls';

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {Observable} from 'rxjs';
import {Achievement} from '../models/achievement';
import {Page} from '../models/page';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  private readonly findByUserIdUrl: string;
  private readonly findByAchievementIdUrl: string;

  constructor(private httpClient: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.findByUserIdUrl = apiUrls.API_ACHIEVEMENT.FIND_BY_USER_ID;
    this.findByAchievementIdUrl = apiUrls.API_ACHIEVEMENT.FIND_BY_ACHIEVEMENT_ID;
  }

  public getAchievementsByUserId(userId: number, page?: number, pageSize?: number): Observable<Page<Achievement>> {
    const params = new HttpParams()
      .append('page', page === undefined ? '' : `${page}`)
      .append('pageSize', pageSize === undefined ? '' : `${pageSize}`);
    return this.httpClient.get<Page<Achievement>>(this.findByUserIdUrl + userId, {params})
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  public countAchievementsByUserId(userId: number): Observable<number> {
    return this.httpClient.get<number>(this.findByUserIdUrl + userId + '/count')
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  public getAchievementById(achievementId: number): Observable<Achievement> {
    return this.httpClient.get<Achievement>(this.findByAchievementIdUrl + achievementId)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
