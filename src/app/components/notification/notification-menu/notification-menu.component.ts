import {Component, OnInit, OnDestroy} from '@angular/core';
import {NotificationService} from '../../../service/notification.service';
import {Page} from '../../../models/page';
import {FullNotification} from '../../../models/full-notification';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit {
  notifications: Page<FullNotification>;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }


  getNotifications(): void {
    this.notificationService.getNotifications(0, 5)
        .subscribe(result => this.notifications = result);
  }

}
