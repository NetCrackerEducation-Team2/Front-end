import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FriendStatus} from '../../models/friend-status';
import {FriendService} from '../../service/friend.service';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() profile: User;
  friendStatus: FriendStatus;

  constructor(private friendService: FriendService) {
  }

  private setDefaultAvatar() {
    this.profile.photoPath = '../../../assets/images/default_avatar.jpg';
  }

  ngOnInit() {
    this.setDefaultAvatar();
    this.loadFriendStatus();
  }

  private loadFriendStatus() {
    this.friendService.getFriendStatus(this.profile.userId).subscribe(friendStatus => {
      this.friendStatus = friendStatus;
    });
  }

  sendFriendRequest() {
    // FIXME check if response status is OK
    this.friendService.sendFriendRequest(this.profile.userId).subscribe(response => {
      this.friendStatus.awaitFriendRequestConfirmation = true;
    });
  }

  deleteFromFriends() {
    console.log('Sending delete from friends request');
    this.friendService.deleteFromFriends(this.profile.userId).subscribe(response => {
      this.friendStatus.friend = false;
      this.friendStatus.awaitFriendRequestConfirmation = false;
    });
  }
}
