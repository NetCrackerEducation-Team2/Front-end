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
  pageSize = 1;
  page: number;

  @Input() reviewId: number;
  reviewComments: BookReviewComment[];
  ableToExpand: boolean;

  constructor( private bookReviewCommentService: BookReviewCommentService,
               private accountService: AccountService ) { }

  ngOnInit() {
    this.page = 1;
    this.reviewComments = [];
    this.ableToExpand = true;
    this.getReviewComment();
  }

  getReviewComment(): void {
    this.bookReviewCommentService.getBookReviewComments(this.reviewId, this.page, this.pageSize).pipe(
      map((respPage: Page<BookReviewComment>) => {
        return respPage.array;
      }),
      flatMap((reviewCommentList: BookReviewComment[]) => {
        if (reviewCommentList.length === 0) {
          this.ableToExpand = false;
        }
        console.log('Size: ' + reviewCommentList.length);
        return reviewCommentList;
      }),
    ).subscribe((reviewComment: BookReviewComment) => {
      this.accountService.getUserById(reviewComment.authorId).pipe(
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
    this.page += 1;
    this.getReviewComment();
  }
}
