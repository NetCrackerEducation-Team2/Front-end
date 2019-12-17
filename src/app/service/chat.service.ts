import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from '../../api-urls';
import {Chat} from '../models/chat';
import {catchError} from 'rxjs/operators';
import {FriendStatus} from '../models/friend-status';
import {User} from '../models/user';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API_CHAT_CREATE;
  private readonly API_GROUP_CHAT_CREATE;
  private readonly API_GET_GROUP_CHATS;
  private readonly API_GET_CHAT_USERS;
  private readonly API_CHAT_ADD_USER;
  private readonly API_SEND;
  private readonly API_GET_MESSAGES;
  private readonly API_GET_CHAT;
  private readonly API_GET_GROUP_MESSAGES;
  private readonly API_SEND_GROUP;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private handleErrorService: ErrorHandlerService) {

    this.API_CHAT_CREATE = apiUrls.API_CHAT.API_CHAT_CREATE;
    this.API_GROUP_CHAT_CREATE = apiUrls.API_CHAT.API_GROUP_CHAT_CREATE;
    this.API_GET_GROUP_CHATS = apiUrls.API_CHAT.API_GET_GROUP_CHATS;
    this.API_GET_CHAT_USERS = apiUrls.API_CHAT.API_GET_CHAT_USERS;
    this.API_CHAT_ADD_USER = apiUrls.API_CHAT.API_CHAT_ADD_USER;
    this.API_SEND = apiUrls.API_CHAT.API_SEND;
    this.API_GET_MESSAGES = apiUrls.API_CHAT.API_GET_MESSAGES;
    this.API_GET_CHAT = apiUrls.API_CHAT.API_GET_CHAT;
    this.API_GET_GROUP_MESSAGES = apiUrls.API_CHAT.API_GET_GROUP_MESSAGES;
    this.API_SEND_GROUP = apiUrls.API_CHAT.API_SEND_GROUP;
  }

  createChat(friendId: number, userCurrentId: number): Observable<Chat> {
    console.log(this.API_CHAT_CREATE);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Chat>(this.API_CHAT_CREATE , JSON.stringify({friendId, userCurrentId}), {headers}).pipe(
      catchError(this.errorHandlerService.handleError<any>('createChat', []))
    );
  }

  createGroupChat(usersId: number[], chatName: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Chat>(this.API_GROUP_CHAT_CREATE , JSON.stringify({usersId, chatName}), {headers}).pipe(
      catchError(this.errorHandlerService.handleError<any>('createGroupChat', []))
    );
  }
  addNewUserChat(usersId: number[], chatName: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.API_CHAT_ADD_USER , JSON.stringify({usersId, chatName}), {headers}).pipe(
      catchError(this.errorHandlerService.handleError<any>('createGroupChat', [])));
  }

  getGroupChats(userCurrentId: number): Observable<Chat[]> {
    const params = new HttpParams().set('userCurrentId', userCurrentId.toString());
    return this.http.get<Chat[]>(this.API_GET_GROUP_CHATS, {params});
  }

  getChatUsers(chatName: string): Observable<User[]> {
    const params = new HttpParams().set('chatName', chatName);
    return this.http.get<User[]>(this.API_GET_CHAT_USERS, {params});
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
