import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../service/notification.service';
import { Notification } from '../../../models/notification';
import {ListItemInfo} from '../../../models/presentation-models/list-item-info';
import {Page} from '../../../models/page';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../../service/account.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  providers: [DatePipe]
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[];
  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo> = new Page<ListItemInfo>();

  constructor(private notificationService: NotificationService,
              public datePipe: DatePipe,
              private accountService: AccountService) { }

  ngOnInit() {
    this.resetPaginator();
    this.getNotifications();
  }

  getNotifications(): void {
    this.pageLoading = true;
    this.notificationService.getNotifications(this.selectedPage.currentPage, this.selectedPage.pageSize)
    .pipe(map(page => {
      return this.mapPage(page);
    }))
    .subscribe(selectedPage => {
      this.selectedPage = selectedPage;
      this.pageLoading = false;
    });
  }

  private mapPage(page: Page<Notification>): Page<ListItemInfo> {
    return {
      currentPage: page.currentPage,
      countPages: page.countPages,
      pageSize: page.pageSize,
      array: page.array.map(notification => {
        return {
          title: null,
          subtitle: this.datePipe.transform(notification.creationTime, 'd LLLL yyyy, h:mm'),
          photo: null,
          itemId: notification.notificationId,
          publish: null,
          contentElements: [
            {contentInfoId: 1, title: null, content: notification.notificationMessage},
          ],
          actionElements: null,
          listItemCallback: null,
          additionalParams: null
        };
      })
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
