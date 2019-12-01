import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CheckPaginationService} from './check-pagination.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {catchError} from 'rxjs/operators';
import {BookReview} from '../models/book-review';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookReviewsService {

  private readonly reviewsUrl: string;

  constructor(private http: HttpClient,
              private checkPaginationService: CheckPaginationService,
              private errorHandlerService: ErrorHandlerService) {
    this.reviewsUrl = environment.API_REVIEWS;
  }

  getAllBooksReviews(page: number, pageSize: number): Observable<any> {
    let paramsString: string;
    paramsString = this.checkPaginationService.checkPagination(page, pageSize);
    return this.http.get(this.reviewsUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAllBookReviews', []))
      );
  }
}
