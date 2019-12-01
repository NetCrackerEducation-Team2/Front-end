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
  pageSize = 2;
  page: number;
  loading: boolean;

  @Input() reviewId: number;
  reviewComments: BookReviewComment[];
  ableToExpand: boolean;

  constructor( private bookReviewCommentService: BookReviewCommentService,
               private accountService: AccountService ) { }

  ngOnInit() {
    this.page = 1;
    this.reviewComments = [];
    this.ableToExpand = true;
    this.loading = true;
    this.getReviewComment();
  }

  getReviewComment(): void {
    this.loading = true;
    const tmpComments: BookReviewComment[] = [];
    this.bookReviewCommentService.getBookReviewComments(this.reviewId, this.page, this.pageSize).pipe(
      map((respPage: Page<BookReviewComment>) => {
        return respPage.array;
      }),
      flatMap((reviewCommentList: BookReviewComment[]) => {
        if (reviewCommentList.length < this.pageSize) {
          this.ableToExpand = false;
          this.loading = false;
        }
        return reviewCommentList;
      }),
      flatMap((reviewComment: BookReviewComment) => {
        tmpComments.push(reviewComment);
        return this.accountService.getUserById(reviewComment.userId);
      }),
      map((author: User) => {
        const comment = tmpComments.filter(value => value.userId === author.userId)[0];
        comment.author = author;
        this.reviewComments.push(comment);
        this.loading = false;
      }),
    ).subscribe();
  }
  expandReviewsComments(): void {
    this.page += 1;
    this.getReviewComment();
  }
}
