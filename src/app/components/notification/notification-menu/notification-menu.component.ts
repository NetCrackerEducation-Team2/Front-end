import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../service/notification.service';
import { Notification } from '../../../models/notification';
import {Page} from '../../../models/page';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit {
  notifications: Page<Notification>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications(0, 5)
        .subscribe(result => this.notifications = result);
  }

}
