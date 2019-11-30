import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FriendStatus} from '../models/friend-status';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private readonly friendStatusUrl: string;
  private readonly friendRequestUrl: string;

  constructor(private http: HttpClient) {
    this.friendStatusUrl = apiUrls.API_FRIENDS.API_FRIENDS_STATUS;
    this.friendRequestUrl = apiUrls.API_FRIENDS.API_FRIEND_REQUEST;
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
