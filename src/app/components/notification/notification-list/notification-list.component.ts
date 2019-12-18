import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NotificationService} from '../../../service/notification.service';
import {Notification} from '../../../models/notification';
import {ListItemInfo} from '../../../models/presentation-models/list-item-info';
import {Page} from '../../../models/page';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../../service/account.service';
import {FullNotification} from '../../../models/full-notification';
import {FriendService} from '../../../service/friend.service';
import {SnackBarService} from '../../../service/presentation-services/snackBar.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  providers: [DatePipe]
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[];
  pageLoading: boolean;
  emptyPage: Page<FullNotification> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<FullNotification> = new Page<FullNotification>();

  constructor(private notificationService: NotificationService,
              public datePipe: DatePipe,
              private accountService: AccountService,
              private friendService: FriendService,
              private snackBarService: SnackBarService
              ) {
  }

  ngOnInit() {
    this.resetPaginator();
    this.getNotifications();
  }

  getNotifications(): void {
    this.pageLoading = true;
    this.notificationService.getNotifications(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe()
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      });
  }

  private mapPage(page: Page<FullNotification>): Page<ListItemInfo> {
    return {
      currentPage: page.currentPage,
      countPages: page.countPages,
      pageSize: page.pageSize,
      array: page.array.map(notification => {
        if (notification.notificationObject.notificationType.notificationTypeName === 'invitations') {
          return this.mapFriendInvitationNotification(notification);
        } else {
          return {
            title: null,
            subtitle: this.datePipe.transform(notification.notificationObject.creationTime, 'd LLLL yyyy, H:mm'),
            photoPath: null,
            itemId: notification.notificationId,
            publish: null,
            contentElements: [
              {
                contentInfoId: 1,
                title: null,
                content: notification.notificationObject.notificationMessage.notificationMessageText
              },
            ],
            actionElements: null,
            listItemCallback: null,
            additionalParams: null
          };
        }
      })
    };
  }

  private mapNotification(notification: FullNotification): ListItemInfo {
    if (notification.notificationObject.notificationType.notificationTypeName === 'invitations') {
      return this.mapFriendInvitationNotification(notification);
    } else {
      return {
        title: null,
        subtitle: this.datePipe.transform(notification.notificationObject.creationTime, 'd LLLL yyyy, h:mm'),
        photoPath: null,
        publish: null,
        contentElements: [
          {
            contentInfoId: 1,
            title: null,
            content: notification.notificationObject.notificationMessage.notificationMessageText
          },
        ],
        actionElements: null,
        listItemCallback: null,
        additionalParams: null
      };
    }
  }

  private mapFriendInvitationNotification(friendInvitationNotification: FullNotification): ListItemInfo {
    return {
      title: null,
      subtitle: this.datePipe.transform(friendInvitationNotification.notificationObject.creationTime, 'd LLLL yyyy, H:mm'),
      photoPath: null,
      publish: null,
      contentElements: [
        {
          contentInfoId: 1,
          title: null,
          content: friendInvitationNotification.notificationObject.notificationMessage.notificationMessageText
        },
      ],
      actionElements: [
        {
          buttonInfoId: friendInvitationNotification.notificationId,
          disabled: false,
          name: 'Accept',
          url: '.',
          clickFunction: () => {
            console.log('Accepting friend request...');
            this.friendService.acceptFriendRequest(friendInvitationNotification.notificationObject.entityId).subscribe(response => {
              if (response) {
                this.snackBarService.openSuccessSnackBar('Friend request has been successfully accepted');
              }
            });
          },
        },
        {
          buttonInfoId: friendInvitationNotification.notificationId,
          disabled: false,
          name: 'Decline',
          url: '.',
          clickFunction: () => {
            console.log('Declining friend request...');
            this.friendService.declineFriendRequest(friendInvitationNotification.notificationObject.entityId).subscribe(response => {
              if (response) {
                this.snackBarService.openSuccessSnackBar('Friend request has been successfully declined');
              }
            });
          },
        }
      ],
      listItemCallback: null,
      additionalParams: null
    };
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getNotifications();
  }

  private resetPaginator() {
    this.selectedPage = this.emptyPage;
  }

  public isLogged(): boolean {
    return this.accountService.getToken() !== null;
  }

}
