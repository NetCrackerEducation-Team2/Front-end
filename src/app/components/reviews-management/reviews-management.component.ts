import { Component, OnInit } from '@angular/core';
import {PublishOverviewService} from '../../service/publish-overview.service';
import {BookOverviewService} from '../../service/book-overview.service';
import {PublishReviewService} from '../../service/publish-review.service';
import {BookReviewsService} from '../../service/book-reviews.service';
import {PageEvent} from '@angular/material';
import {Page} from '../../models/page';
import {BookOverview} from '../../models/book-overview';
import {BookReview} from '../../models/book-review';

@Component({
  selector: 'app-reviews-management',
  templateUrl: './reviews-management.component.html',
  styleUrls: ['./reviews-management.component.css']
})
export class ReviewsManagementComponent implements OnInit {
  selectedPage: Page<BookReview> = new Page<BookReview>();
  bookId: number;
  constructor(private publishReviewService: PublishReviewService,
              private bookReviewsService: BookReviewsService) { }

  ngOnInit() {
    this.getReviews();
  }

  publish(bookId: number) {
    this.publishReviewService.publishReview(bookId);
  }

  unpublished(bookId: number) {
    this.publishReviewService.publishReview(bookId);
  }

  getReviews(): void {
    this.bookReviewsService.getAllBooksReviews(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(result => this.selectedPage = result);
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getReviews();
  }

}
