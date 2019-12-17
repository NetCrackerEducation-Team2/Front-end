import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FullNotification} from '../../../../models/full-notification';
import {ListItemInfo} from '../../../../models/presentation-models/list-item-info';
import {DatePipe} from '@angular/common';
import {FriendService} from '../../../../service/friend.service';
import {SnackBarService} from '../../../../service/presentation-services/snackBar.service';
import {ButtonInfo} from '../../../../models/presentation-models/button-info';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-friend-invitation-notification',
  templateUrl: './friend-request-notification-item.component.html',
  styleUrls: ['./friend-request-notification-item.css'],
})
export class FriendRequestNotificationItemComponent implements OnInit, OnDestroy {
  @Input() notification: FullNotification;
  private listItem: ListItemInfo;
  private acceptActionElement: ButtonInfo;
  private declineActionElement: ButtonInfo;
  // Subscriptions
  private friendStatusSubscription: Subscription;
  private friendRequestSubscription: Subscription;

  constructor(private datePipe: DatePipe,
              private friendService: FriendService,
              private snackBarService: SnackBarService) {
  }

  ngOnDestroy(): void {
    if (this.friendStatusSubscription) {
      this.friendStatusSubscription.unsubscribe();
    }
    if (this.friendRequestSubscription) {
      this.friendRequestSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const invitationId = this.notification.notificationObject.entityId;
    // getting info about current friend invitation status
    this.friendStatusSubscription = this.friendService.getFriendInvitation(invitationId).subscribe(invitation => {
      // if friend invitation has been already accepted/declined => displaying corresponding message
      if (invitation.accepted !== null) {
        this.initStatusMessage('Friend request ' + (invitation.accepted ? 'accepted' : 'declined'));
      } else { // showing buttons
        this.initButtons();
      }
    });
    //  converting notification object to list item component
    this.listItem = {
      title: null,
      subtitle: this.datePipe.transform(this.notification.notificationObject.creationTime, 'd LLLL yyyy, h:mm'),
      photoPath: null,
      publish: null,
      contentElements: [
        {
          contentInfoId: 1,
          title: null,
          content: this.notification.notificationObject.notificationMessage.notificationMessageText
        },
      ],
      actionElements: [],
      listItemCallback: null,
      additionalParams: null
    };
  }

  /**
   * Inits acceptActionElement & declineActionElement
   */
  private initButtons() {
    this.acceptActionElement = {
      buttonInfoId: this.notification.notificationId,
      disabled: false,
      name: 'Accept',
      url: '.',
      clickFunction: null,
    };
    this.acceptActionElement.clickFunction = () => {
      this.friendRequestSubscription = this.friendService.acceptFriendRequest(this.notification.notificationObject.entityId)
        .subscribe(response => {
        if (response) {
          this.snackBarService.openSuccessSnackBar('Friend request has been successfully accepted');
          this.initStatusMessage('Friend request accepted');
          this.hideButtons();
        }
      });
    };
    this.declineActionElement = {
      buttonInfoId: this.notification.notificationId,
      disabled: false,
      name: 'Decline',
      url: '.',
      clickFunction: null
    };
    this.declineActionElement.clickFunction = () => {
      console.log('Declining friend request...');
      this.friendRequestSubscription = this.friendService.declineFriendRequest(this.notification.notificationObject.entityId)
        .subscribe(response => {
        if (response) {
          this.snackBarService.openSuccessSnackBar('Friend request has been successfully declined');
          this.initStatusMessage('Friend request declined');
          this.hideButtons();
        }
      });
    };
    // setting buttons
    this.listItem.actionElements = [this.acceptActionElement, this.declineActionElement];
  }

  private initStatusMessage(message: string) {
    this.listItem.title = message;
  }

  private hideButtons() {
    this.listItem.actionElements = [];
  }
}
