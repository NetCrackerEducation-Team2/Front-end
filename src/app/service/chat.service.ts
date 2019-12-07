import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from '../../api-urls';
import {Chat} from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API_CHAT_CREATE;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    this.API_CHAT_CREATE = apiUrls.API_CHAT.API_CHAT_CREATE;
  }

  createChat(friendId: number, userCurrentId: number): Observable<Chat> {
    console.log(this.API_CHAT_CREATE);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Chat>(this.API_CHAT_CREATE , JSON.stringify({friendId, userCurrentId}), {headers});
  }
}
