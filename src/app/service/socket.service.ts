import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  url: string = environment.url + 'api/ws';

  constructor(private http: HttpClient) { }

  post(data: Message) {
    return this.http.post(this.url, data);
  }
}
