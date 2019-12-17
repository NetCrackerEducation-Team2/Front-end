import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FriendStatus} from '../../models/friend-status';
import {FriendService} from '../../service/friend.service';
import {SnackBarService} from '../../service/presentation-services/snackBar.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteFromFriendsDialog} from './confirm-delete-from-friends-dialog/confirm-delete-from-friends-dialog.component';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() profile: User;
  friendStatus: FriendStatus;

  constructor(private friendService: FriendService, private snackBarService: SnackBarService, private dialog: MatDialog) {
  }

  private setDefaultAvatar() {
    this.profile.photoPath = '../../../assets/images/default_avatar.jpg';
  }

  ngOnInit() {
    this.setDefaultAvatar();
    this.loadFriendStatus();
  }

  private loadFriendStatus() {
    const targetUserId = this.profile.userId;
    if (targetUserId) {
      this.friendService.getFriendStatus(targetUserId).subscribe(friendStatus => {
        this.friendStatus = friendStatus;
      });
    }
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
    const confirmationDialogRef = this.dialog.open(ConfirmDeleteFromFriendsDialog, {
      width: '400px',
      height: '150px',
      data: {username: this.profile.fullName}
    });
    // FIXME asem subscribe into subscribe
    confirmationDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.friendService.deleteFromFriends(this.profile.userId).subscribe(response => {
          if (response) {
            this.friendStatus.friend = false;
            this.friendStatus.awaitFriendRequestConfirmation = false;
            this.snackBarService.openSuccessSnackBar('Friend has been successfully removed');
          }
        });
      }
    });
  }
}

