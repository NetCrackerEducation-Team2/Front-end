import { Injectable } from '@angular/core';
import {LogService} from "./log.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private logger: LogService) { }

  handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
