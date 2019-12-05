import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FriendStatus} from '../../models/friend-status';
import {FriendService} from '../../service/friend.service';
import {renderConstantPool} from "@angular/compiler-cli/ngcc/src/rendering/renderer";
import {SnackBarService} from "../../service/presentation-services/snackBar.service";


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() profile: User;
  friendStatus: FriendStatus;

  constructor(private friendService: FriendService, private snackBarService: SnackBarService) {
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
    this.friendService.sendFriendRequest(this.profile.userId).subscribe(response => {
      console.log('Friend request response ', response);
      if (response != null) {
        this.friendStatus.awaitFriendRequestConfirmation = true;
        this.snackBarService.openSuccessSnackBar('Friend request has been successfully sent');
      }
    });
  }

  deleteFromFriends() {
    console.log('Sending delete from friends request');
    this.friendService.deleteFromFriends(this.profile.userId).subscribe(response => {
      if (response) {
        this.friendStatus.friend = false;
        this.friendStatus.awaitFriendRequestConfirmation = false;
        this.snackBarService.openSuccessSnackBar('Friend has been successfully removed');
      }
    });
  }
}
