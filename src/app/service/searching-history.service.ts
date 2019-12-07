import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {catchError} from 'rxjs/operators';
import {apiUrls} from '../../api-urls';
import {Observable, of} from 'rxjs';
import {BookFilteringParam} from '../models/book-filtering-param';
import {User} from '../models/user';
import {Book} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class SearchingHistoryService {

  private readonly addSearchingHistoriesUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.addSearchingHistoriesUrl = apiUrls.API_ADD_SEARCHING_HISTORIES;
  }

  addSearchingHistories(user: User, filteringParams: Map<BookFilteringParam, any>, books: Book[]): Observable<object>{
    if(user) {
      let searchingHistories = books.map(book => {
        return {
          searchingHistoryId: 0,
          bookId: book.bookId,
          userId: user.userId,
          creationTime: null
        };
      });
      if (!this.isEmptyValues(filteringParams)) {
        return this.http.post(this.addSearchingHistoriesUrl, searchingHistories)
          .pipe(
            catchError(this.errorHandlerService.handleError<any>('addSearchingHistories', []))
          );
      }
    }
    return of(null);
  }

  private isEmptyValues(filteringParams: Map<BookFilteringParam, any>): boolean{
    let res: boolean = true;
    for(let val of filteringParams.values()){
      if(val){
        res = false;
        break;
      }
    }
    return res;
  }
}
