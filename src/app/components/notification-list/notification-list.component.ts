import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications()
        .subscribe(result => this.notifications = result);
  }

}
