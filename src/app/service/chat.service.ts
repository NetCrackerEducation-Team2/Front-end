import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from '../../api-urls';
import {Chat} from '../models/chat';
import {catchError} from 'rxjs/operators';
import {FriendStatus} from '../models/friend-status';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API_CHAT_CREATE;
  private readonly API_GROUP_CHAT_CREATE;
  private readonly API_GET_GROUP_CHATS;
  private readonly API_GET_CHAT_USERS;
  private readonly API_CHAT_ADD_USER;
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    this.API_CHAT_CREATE = apiUrls.API_CHAT.API_CHAT_CREATE;
    this.API_GROUP_CHAT_CREATE = apiUrls.API_CHAT.API_GROUP_CHAT_CREATE;
    this.API_GET_GROUP_CHATS = apiUrls.API_CHAT.API_GET_GROUP_CHATS;
    this.API_GET_CHAT_USERS = apiUrls.API_CHAT.API_GET_CHAT_USERS;
    this.API_CHAT_ADD_USER = apiUrls.API_CHAT.API_CHAT_ADD_USER;
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
}
