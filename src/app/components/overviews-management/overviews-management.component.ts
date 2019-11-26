import { Component, OnInit } from '@angular/core';
import {Page} from '../../models/page';
import {Announcement} from '../../models/announcement';
import {PublishAnnouncementService} from '../../service/publish-announcement.service';
import {PublishOverviewService} from '../../service/publish-overview.service';
import {PageEvent} from '@angular/material';
import {BookOverviewService} from '../../service/book-overview.service';
import {BookOverview} from '../../models/book-overview';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-books-management',
  templateUrl: './overviews-management.component.html',
  styleUrls: ['./overviews-management.component.css'],
  providers: [DatePipe]
})
export class OverviewsManagementComponent implements OnInit {
  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo> = new Page<ListItemInfo>();

  constructor(private publishOverviewService: PublishOverviewService,
              public datePipe: DatePipe,
              private bookOverviewsService: BookOverviewService) {

  }

  ngOnInit() {
    this.resetPaginator();
    this.getOverviews();
  }

  publish(bookId: number) {
    this.publishOverviewService.publishOverview(bookId);
  }

  unpublished(bookId: number) {
    this.publishOverviewService.publishOverview(bookId);
  }

  getOverviews(): void {
    this.pageLoading = true;
    this.bookOverviewsService.getAllBooksOverviews(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return this.mapPage(page);
      }))
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      });
  }
  private mapPage(page: Page<BookOverview>): Page<ListItemInfo> {
    return {
      currentPage: page.currentPage,
      countPages: page.countPages,
      pageSize: page.pageSize,
      array: page.array.map(bookOverview => {
        return {
          user: bookOverview.user,
          description: bookOverview.description,
          creationTime: this.datePipe.transform(bookOverview.creationTime, 'd LLLL yyyy, h:mm'),
          photo: null,
          title: null,
          itemId: null,
          subtitle: null,
          publish: null,
          contentElements: [
            {contentInfoId: 1, title: null, content: bookOverview.description},
          ],
          actionElements: [
            {buttonInfoId: 1, name: 'Publish', url: null, disabled: bookOverview.published,
              clickFunction: () => {console.log(bookOverview.bookId);
                                    this.publishOverviewService.publishOverview(bookOverview.bookId); }},
            {buttonInfoId: 2, name: 'Unpublish', url: null, disabled: bookOverview.published,
              clickFunction: () => {console.log(bookOverview.bookId);
                                    this.publishOverviewService.publishOverview(bookOverview.bookId); }}
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
    this.getOverviews();
  }

  private resetPaginator() {
    this.selectedPage = this.emptyPage;
  }

}
