import { Component, OnInit } from '@angular/core';
import {Page} from '../../models/page';
import {Announcement} from '../../models/announcement';
import {PublishAnnouncementService} from '../../service/publish-announcement.service';
import {PublishOverviewService} from '../../service/publish-overview.service';
import {PageEvent} from '@angular/material';
import {BookOverviewService} from '../../service/book-overview.service';
import {BookOverview} from '../../models/book-overview';

@Component({
  selector: 'app-books-management',
  templateUrl: './overviews-management.component.html',
  styleUrls: ['./overviews-management.component.css']
})
export class OverviewsManagementComponent implements OnInit {
  selectedPage: Page<BookOverview> = new Page<BookOverview>();
  bookId: number;

  constructor(private publishOverviewService: PublishOverviewService,
              private bookOverviewsService: BookOverviewService) {

  }

  ngOnInit() {
    this.getOverviews();
  }

  publish(bookId: number) {
    this.publishOverviewService.publishOverview(bookId);
  }

  unpublished(bookId: number) {
    this.publishOverviewService.publishOverview(bookId);
  }

  getOverviews(): void {
    this.bookOverviewsService.getAllBooksOverviews(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(result => this.selectedPage = result);
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getOverviews();
  }

}
