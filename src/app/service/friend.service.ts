import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ErrorHandlerService} from './logging/error-handler.service';
import {FriendStatus} from '../models/friend-status';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private readonly friendStatusUrl: string;
  private readonly friendRequestUrl: string;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.friendStatusUrl = environment.API_FRIENDS.API_FRIENDS_STATUS;
    this.friendRequestUrl = environment.API_FRIENDS.API_FRIEND_REQUEST;
  }

  getFriendStatus(targetUserId: number): Observable<FriendStatus> {
    const params = new HttpParams().set('targetUserId', targetUserId.toString());
    return this.http.get<FriendStatus>(this.friendStatusUrl, {params});
  }

  sendFriendRequest(destinationUserId: number) {
    const params = new HttpParams().set('destinationUserId', destinationUserId.toString());
    return this.http.post(this.friendRequestUrl, null, {params});
  }

  deleteFromFriends(friendId: number) {
    const params = new HttpParams().set('friendId', friendId.toString());
    return this.http.delete(this.friendRequestUrl, {params});
  }
}
