import {Component, OnInit, OnDestroy} from '@angular/core';
import {NotificationService} from '../../../service/notification.service';
import {Page} from '../../../models/page';
import {FullNotification} from '../../../models/full-notification';
import {Subscription} from 'rxjs';
import {SocketHolder} from '../../../models/socket-holder';
import {apiUrls} from '../../../../api-urls';
import {AccountService} from '../../../service/account.service';
import {SnackBarService} from '../../../service/presentation-services/snackBar.service';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit {
  notifications: Page<FullNotification>;
  socketUrl!: string;
  socket!: SocketHolder;
  profileId: number;
  isNewNotification: boolean;
  notificationCount: number;

  constructor(private notificationService: NotificationService, private accountService: AccountService,
              private snackBarService: SnackBarService) {
    this.socketUrl = apiUrls.WEBSOCKET;
    this.socket = new SocketHolder(this.socketUrl);
   }

  ngOnInit() {
    this.openSocketConnection();
    this.getNotifications();
    this.isNewNotification = false;
    this.getNotificationsCount();
  }


  getNotifications(): void {
    this.notificationService.getNotifications(0, 5)
        .subscribe(result => this.notifications = result);
  }

  getNotificationsCount(): void {
    this.notificationService.getNotificationsCount()
        .subscribe(result => this.notificationCount = result);
  }

  openSocketConnection() {
    const user = this.accountService.getCurrentUser();
    if (user != null && user.userId != null) {
      this.profileId = user.userId;
    }
    let subscription: Subscription;
    this.socket.stompClient.connect({}, (frame) => {
      console.log('Frame : ', frame);
      this.socket.stompClient.subscribe(`/topic/notifications/${this.profileId}`, notification => {
        this.snackBarService.openSuccessSnackBar('You have new notification');
        this.isNewNotification = true;
        console.log("You have new notification", notification.body);
        this.notificationCount = parseInt(notification.body);
        subscription = this.notificationService.getNotifications(0, 5)
        .subscribe(result => this.notifications = result);
      });
    });
    return subscription;
  }

  ngOnDestroy(): void {
    console.log('destroying `notification menu` component...');
    this.socket.webSocket.close();
  }

}
