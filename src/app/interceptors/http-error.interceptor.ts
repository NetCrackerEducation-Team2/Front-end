import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import {MatSnackBarComponent} from '../components/presentational/mat-snack-bar/mat-snack-bar.component';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector/*, private snackBar: MatSnackBarComponent*/) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          //window.alert(errorMessage);
          //this.snackBar.openSnackBar(error.error.message, 'Close', 'red-snackbar');
          return throwError(errorMessage);
        })
      )
  }
}