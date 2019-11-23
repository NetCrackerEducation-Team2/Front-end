import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {BookReviewCommentService} from '../../service/book-review-comment.service';
import {flatMap, map} from 'rxjs/operators';
import {Page} from '../../models/page';
import {User} from '../../models/user';
import {BookReviewComment} from '../../models/book-review-comment';

@Component({
  selector: 'app-book-review-comment',
  templateUrl: './book-review-comment.component.html',
  styleUrls: ['./book-review-comment.component.css']
})
export class BookReviewCommentComponent implements OnInit {
  defaultPhotoPath = '../../../assets/images/default_avatar.jpg';
  expandCount = 2;
  @Input() reviewId: number;
  reviewComments: BookReviewComment[];
  ableToExpand: boolean;

  constructor( private bookReviewCommentService: BookReviewCommentService,
               private accountService: AccountService ) { }

  ngOnInit() {
    this.reviewComments = [];
    this.ableToExpand = true;
    this.getReviewComment(1, this.expandCount);
  }

  getReviewComment(from: number, count: number): void {
    this.bookReviewCommentService.getBookReviewComments(this.reviewId, from, count).pipe(
      map((respPage: Page<BookReviewComment>) => {
        return respPage.array;
      }),
      flatMap((reviewCommentList: BookReviewComment[]) => {
        if (reviewCommentList.length === 0) {
          this.ableToExpand = false;
        }
        return reviewCommentList;
      }),
    ).subscribe((reviewComment: BookReviewComment) => {
      this.accountService.getUserById(reviewComment).pipe(
        map((author: User) => {
          reviewComment.author = author;
          return reviewComment;
        }))
        .subscribe((finishReviewComment: BookReviewComment) => {
          this.reviewComments.push(finishReviewComment);
        });
    });
  }
  expandReviewsComments(): void {
    this.getReviewComment(this.reviewComments.length + 1, this.expandCount);
  }
}
