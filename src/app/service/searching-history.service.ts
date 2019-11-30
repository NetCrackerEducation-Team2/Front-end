import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {SearchingHistory} from '../models/searching-history';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchingHistoryService {

  private readonly addSearchingHistoriesUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.addSearchingHistoriesUrl = environment.API_ADD_SEARCHING_HISTORIES_URL;
  }

  addSearchingHistories(userId: number, searchingHistories: SearchingHistory[]){
    this.http.post(this.addSearchingHistoriesUrl + userId, searchingHistories)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('addSearchingHistories', []))
      );
  }
}
