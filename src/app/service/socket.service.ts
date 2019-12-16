import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from '../models/message';
import {apiUrls} from '../../api-urls';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly API_SEND;
  private readonly API_GET_MESSAGES;
  private readonly API_GET_CHAT;
  private readonly API_GET_GROUP_MESSAGES;
  private readonly API_SEND_GROUP;

  constructor(private http: HttpClient,
              private handleErrorService: ErrorHandlerService) {
    this.API_SEND = apiUrls.API_CHAT.API_SEND;
    this.API_GET_MESSAGES = apiUrls.API_CHAT.API_GET_MESSAGES;
    this.API_GET_CHAT = apiUrls.API_CHAT.API_GET_CHAT;
    this.API_GET_GROUP_MESSAGES = apiUrls.API_CHAT.API_GET_GROUP_MESSAGES;
    this.API_SEND_GROUP = apiUrls.API_CHAT.API_SEND_GROUP;
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post(this.API_SEND, message)
      .pipe(
      catchError(this.handleErrorService.handleError<any>('sendMessage', []))
    );
  }

  requestParameters(userFriendId: number, userCurrentId: number): string {
    let params = new HttpParams();
    let paramsString = '';
    params = params.set('friendId', userFriendId.toString());
    params = params.set('currentUserId', userCurrentId.toString());
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    return paramsString;
  }

  getMessages(userFriendId: number, userCurrentId: number): Observable<Message[]> {
    return this.http.get(this.API_GET_MESSAGES + this.requestParameters(userFriendId, userCurrentId))
      .pipe(
        catchError(this.handleErrorService.handleError<any>('getMessages', []))
      );

  }

  getGroupMessages(chatName: string): Observable<Message[]> {

    let params = new HttpParams();
    let paramsString = '';
    params = params.set('chatName', chatName.toString());
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    return this.http.get(this.API_GET_GROUP_MESSAGES + paramsString)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('getGroupMessages', []))
      );

  }

  getChatId(userFriendId: number, userCurrentId: number): Observable<Chat> {
    return this.http.get<Chat>(this.API_GET_CHAT + this.requestParameters(userFriendId, userCurrentId));
  }

  sendMessageGroup(message: Message) {
    return this.http.post(this.API_SEND_GROUP, message)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('sendMessage', []))
      );
  }
}
