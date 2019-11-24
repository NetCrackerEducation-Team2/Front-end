import {Component, Input, OnInit} from '@angular/core';
import {PublishAnnouncementService} from '../../service/publish-announcement.service';
import {Page} from '../../models/page';
import {Announcement} from '../../models/announcement';
import {AnnouncementService} from '../../service/announcement.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-announcements-management',
  templateUrl: './announcements-management.component.html',
  styleUrls: ['./announcements-management.component.css']
})
export class AnnouncementsManagementComponent implements OnInit {
  selectedPage: Page<Announcement> = new Page<Announcement>();
  bookId: number;

  constructor(private publishAnnouncementService: PublishAnnouncementService,
              private announcementService: AnnouncementService,
              ) {
  }

  ngOnInit() {
    this.getAnnouncements();
  }


  publish(bookId: number) {
    this.publishAnnouncementService.publishAnnouncement(bookId);
  }

  unpublished(bookId: number) {
    this.publishAnnouncementService.unpublishedAnnouncement(bookId);
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(result => this.selectedPage = result);
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getAnnouncements();
  }

}
