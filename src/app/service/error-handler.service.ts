import {ErrorHandler, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SnackBarService} from './presentation-services/snackBar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private snackBarService: SnackBarService) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.snackBarService.openErrorSnackBar(operation + ' failed.', error);
      console.log(error);
      return of(result as T);
    };
  }
}
