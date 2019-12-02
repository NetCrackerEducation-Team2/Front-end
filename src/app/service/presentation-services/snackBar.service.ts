import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  openErrorSnackBar(msg: string = 'An error occurred', error: any = null): void {
    const message = msg + this.getErrorMessage(error);
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  private getErrorMessage(error: any): string {
    const errorMessage = ((error && error.message) || error || '');
    // avoid printing error message that provides no information about error cause
    if (errorMessage.toLowerCase().indexOf('unknown error') >= 0) {
      return '';
    }
    const errorCodeSubstringOffset = errorMessage.includes('Error code: ');
    if (errorCodeSubstringOffset >= 0) {
      const code = +errorMessage.substr(errorCodeSubstringOffset + 'Error code: '.length, 3);
      // tslint:disable-next-line:no-bitwise
      console.log('Error code: ', 0 | (code / 100));
      // Getting http response code category. E.g for code 404 - category 4 (code from series 4xx)
      // tslint:disable-next-line:no-bitwise
      const codeSeries = 0 | (code / 100);
      switch (codeSeries) {
        case 5:
          return 'There is problem with our server. Please try again later';
        // TODO add other cases
      }
    }
    // TODO parse 'Message: ' substring
    return errorMessage;
  }
}
