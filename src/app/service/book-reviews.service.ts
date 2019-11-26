import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CheckPaginationService} from './check-pagination.service';
import {ErrorHandlerService} from './logging/error-handler.service';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {BookOverview} from '../models/book-overview';
import {catchError} from 'rxjs/operators';
import {BookReview} from '../models/book-review';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class BookReviewsService {

  private readonly reviewsUrl: string;

  constructor(private http: HttpClient,
              private checkPaginationService: CheckPaginationService,
              private errorHandlerService: ErrorHandlerService) {
    this.reviewsUrl = apiUrls.API_REVIEWS;
  }

  getAllBooksReviews(page: number, pageSize: number): Observable<Page<BookReview>> {
    let paramsString: string;
    paramsString = this.checkPaginationService.checkPagination(page, pageSize);
    return this.http.get(this.reviewsUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getAllBookOverviews', []))
      );
  }
}
