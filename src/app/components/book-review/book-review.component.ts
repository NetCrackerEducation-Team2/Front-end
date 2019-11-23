import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../../models/page';
import {User} from '../../models/user';
import {BookReview} from '../../models/book-review';
import {BookReviewService} from '../../service/book-review.service';
import {AccountService} from '../../service/account.service';
import {map, flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {
  defaultPhotoPath = '../../../assets/images/default_avatar.jpg';
  expandCount = 10;

  @Input() bookId: number;
  reviews: BookReview[];
  showCommentsFlag: boolean[];
  ableToExpand: boolean;

  constructor( private bookReviewService: BookReviewService,
               private accountService: AccountService
  ) { }

  ngOnInit() {
    this.reviews = [];
    this.ableToExpand = true;
    this.getReviews(1, this.expandCount);
  }

  getReviews(from: number, count: number): void {
    this.prepareComments(this.reviews.length + this.expandCount);

    this.bookReviewService.getBookReview(this.bookId, from, count).pipe(
      map((respPage: Page<BookReview>) => {
        return respPage.array;
      }),
      flatMap((reviewList: BookReview[]) => {
        if (reviewList.length === 0) {
          this.ableToExpand = false;
        }
        return reviewList;
      }),
    ).subscribe((review: BookReview) => {
      this.accountService.getUserById(review.userId).pipe(
        map((author: User) => {
          review.author = author;
          return review;
        }))
        .subscribe((finishReview: BookReview) => {
            this.reviews.push(finishReview);
        });
    });
  }
  expandReviews(): void {
    this.getReviews(this.reviews.length + 1, this.expandCount);
  }

  prepareComments(count: number): void {
    this.showCommentsFlag = [];
    for (let i = 0; i < count; i++) {
      this.showCommentsFlag.push(false);
    }
  }
  showComments(ind: number): void {
    this.showCommentsFlag[ind] = true;
  }
  hideComments(ind: number): void {
    this.showCommentsFlag[ind] = false;
  }
}
