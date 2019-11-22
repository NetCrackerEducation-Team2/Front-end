import {Component, Input, OnInit} from '@angular/core';
import {BookReview} from '../../models/book-review';
import {BookReviewComment} from '../../models/book-review-comment';
import {BookReviewService} from '../../service/book-review.service';
import {AuthorService} from '../../service/author.service';
import {map, flatMap} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {Page} from '../../models/page';
import {User} from '../../models/user';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {
  @Input() bookId: number;
  size: number;
  reviews: BookReview[];
  showCommentsFlag: boolean[];

  avatartPath: string;
  fullName: string;

  constructor( private bookReviewService: BookReviewService,
               private accountService: AccountService
  ) { }

  ngOnInit() {
    this.avatartPath = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
    this.fullName = 'Ivanov Ivan';

    this.size = 5;
    this.reviews = [];
    this.showReviews(1, this.size);
  }

  showReviews(from: number, count: number): void {
    this.prepareFlags(this.size);

    this.bookReviewService.getBookReview(this.bookId, from, count).pipe(
      map((respPage: Page<BookReview>) => {
        return respPage.array;
      }),
      flatMap((reviewList: BookReview[]) => {
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
    const oldSize = this.size;
    this.size += 5;
    this.showReviews(oldSize, this.size);
  }

  prepareFlags(count: number): void {
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
