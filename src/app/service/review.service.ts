import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {catchError} from 'rxjs/operators';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  readonly reviewUrl: string;

  constructor(private http: HttpClient,
              private logger: LogService) {
    this.reviewUrl = apiUrls.API_REVIEW;
  }

  createReview(rating: number, description: string, bookId: number) {
    let userId = null;
    try {
      userId = JSON.parse(localStorage.getItem('currentUser')).userId;
    } catch (e) {
      // TODO error handling here
      return;
    }
    return this.http.post(this.reviewUrl, {
      userId,
      bookId,
      rating,
      description
    }).pipe(
      catchError(this.errorHandlerService.handleError<any>('searchGenres', []))
    );
  }
}
