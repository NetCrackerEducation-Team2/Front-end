import {Component, OnInit} from '@angular/core';
import {PublishReviewService} from '../../service/publish-review.service';
import {BookReviewsService} from '../../service/book-reviews.service';
import {PageEvent} from '@angular/material';
import {Page} from '../../models/page';
import {BookReview} from '../../models/book-review';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {DatePipe} from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-reviews-management',
  templateUrl: './reviews-management.component.html',
  styleUrls: ['./reviews-management.component.css'],
  providers: [DatePipe]
})
export class ReviewsManagementComponent implements OnInit {
  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo> = new Page<ListItemInfo>();
  constructor(private publishReviewService: PublishReviewService,
              public datePipe: DatePipe,
              private bookReviewsService: BookReviewsService) { }

  ngOnInit() {
    this.resetPaginator();
    this.getReviews();
  }

  publish(bookId: number) {
    this.publishReviewService.publishReview(bookId);
  }

  unpublished(bookId: number) {
    this.publishReviewService.publishReview(bookId);
  }
  getReviews(): void {
    this.pageLoading = true;
    this.bookReviewsService.getAllBooksReviews(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return this.mapPage(page);
      }))
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      });
  }
  private mapPage(page: Page<BookReview>): Page<ListItemInfo> {
    return {
      currentPage: page.currentPage,
      countPages: page.countPages,
      pageSize: page.pageSize,
      array: page.array.map(bookReview => {
        return {
          user: null,
          publish: null,
          description: bookReview.description,
          creationTime: this.datePipe.transform(bookReview.creationTime, 'd LLLL yyyy, h:mm'),
          photo: null,
          title: null,
          itemId: null,
          subtitle: null,
          contentElements: [
            {contentInfoId: 1, title: null, content: bookReview.description},
          ],
          actionElements: [
            {buttonInfoId: 1, name: 'Publish', url: null, disabled: bookReview.published,
              clickFunction: () => {console.log(bookReview.bookId);
                                    this.publishReviewService.publishReview(bookReview.bookId); }},
            {buttonInfoId: 2, name: 'Unpublish', url: null, disabled: bookReview.published,
              clickFunction: () => {console.log(bookReview.bookId);
                                    this.publishReviewService.publishReview(bookReview.bookId); }}
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
    this.getReviews();
  }
  private resetPaginator() {
    this.selectedPage = this.emptyPage;
  }
}
