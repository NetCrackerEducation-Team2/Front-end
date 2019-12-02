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
  url: string = apiUrls.API_CHAT;

  constructor(private http: HttpClient,
              private handleErrorService: ErrorHandlerService) { }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post(this.url, message)
      .pipe(
      catchError(this.handleErrorService.handleError<any>('sendMessage', []))
    );
  }

  getMessages(user1Id: number, user2Id: number): Observable<Message> {
    let params = new HttpParams();
    let paramsString = '';
    if (user1Id != null) {
      params = params.set('user1_id', user1Id.toString());
    }
    if (user2Id != null) {
      params = params.set('user2_id', user2Id.toString());
    }
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    return this.http.get(this.url + paramsString)
      .pipe(
      catchError(this.handleErrorService.handleError<any>('getMessages', []))
    );
  }


}
