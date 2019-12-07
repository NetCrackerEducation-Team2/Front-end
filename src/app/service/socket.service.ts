import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from '../models/message';
import {apiUrls} from '../../api-urls';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly API_SEND;
  constructor(private http: HttpClient,
              private handleErrorService: ErrorHandlerService) {
    this.API_SEND = apiUrls.API_CHAT.API_SEND;
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post(this.API_SEND, message)
      .pipe(
      catchError(this.handleErrorService.handleError<any>('sendMessage', []))
    );
  }

}
