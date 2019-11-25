import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Page} from '../../models/page';
import { AnnouncementService } from '../../service/announcement.service';
import {PageEvent} from '@angular/material';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {map} from 'rxjs/operators';
import {Announcement} from '../../models/announcement';
import {AccountService} from '../../service/account.service';
import {PublishAnnouncementService} from '../../service/publish-announcement.service';
@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css'],
  providers: [DatePipe]
})
export class AnnouncementListComponent implements OnInit {
  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo> = new Page<ListItemInfo>();
  selectedPagePublish: Page<ListItemInfo> = new Page<ListItemInfo>();

  constructor(private publishAnnouncementService: PublishAnnouncementService,
              public datePipe: DatePipe,
              private announcementService: AnnouncementService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.resetPaginator();
    this.getAnnouncements();
    this.getPublishedAnnouncements();
  }


  publish(bookId: number) {
    console.log(bookId);
    this.publishAnnouncementService.publishAnnouncement(bookId);
  }

  unpublished(bookId: number) {
    console.log(bookId);
    this.publishAnnouncementService.unpublishedAnnouncement(bookId);
  }

  getAnnouncements(): void {
    this.pageLoading = true;
    this.announcementService.getAnnouncements(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return this.mapPage(page);
      }))
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      });
  }

  getPublishedAnnouncements(): void {
    this.pageLoading = true;
    this.announcementService.getPublishedAnnouncements(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return this.mapPage(page);
      }))
      .subscribe(selectedPage => {
        this.selectedPagePublish = selectedPage;
        this.pageLoading = false;
      });
  }

  private mapPage(page: Page<Announcement>): Page<ListItemInfo> {
    return {
      currentPage: page.currentPage,
      countPages: page.countPages,
      pageSize: page.pageSize,
      array: page.array.map(announcement => {
        return {
          title: announcement.title,
          subtitle: this.datePipe.transform(announcement.creationTime, 'd LLLL yyyy, h:mm'),
          photo: null,
          itemId: announcement.bookId,
          publish: null,
          contentElements: [
            {contentInfoId: 1, title: null, content: announcement.description},
          ],
          actionElements: [
            {buttonInfoId: 1, name: 'View', url: '/', disabled: false, clickFunction: () => {}}
          ],
          listItemCallback: null,
          additionalParams: null
        };
      })
    };
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getAnnouncements();
  }

  private resetPaginator() {
    this.selectedPage = this.emptyPage;
  }

  public isLogged(): boolean {
    return this.accountService.getToken() !== null;
  }
}
