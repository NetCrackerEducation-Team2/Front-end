import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {apiUrls} from '../../api-urls';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  readonly reviewUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.reviewUrl = apiUrls.API_REVIEW;
  }

  createReview(rating: number, description: string, bookId: number) {
    let userId = null;
    try {
      userId = JSON.parse(localStorage.getItem('currentUser')).userId;
    } catch (e) {
      this.errorHandlerService.handleError('Creating new book review', e);
      return;
    }
    return this.http.post(this.reviewUrl, {
      userId,
      bookId,
      rating,
      description
    }).pipe(
      catchError(this.errorHandlerService.handleError<any>('Creating new book review', null))
    );
  }
}
