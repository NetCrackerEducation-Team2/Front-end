import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {BookReviewCommentService} from '../../service/book-review-comment.service';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {Page} from '../../models/page';
import {User} from '../../models/user';
import {BookReviewComment} from '../../models/book-review-comment';
import {of, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../state/app.state';
import {UserState} from '../../state/user';

@Component({
  selector: 'app-book-review-comment',
  templateUrl: './book-review-comment.component.html',
  styleUrls: ['./book-review-comment.component.css']
})
export class BookReviewCommentComponent implements OnInit, OnDestroy {
  defaultPhotoPath = '../../../assets/images/default_avatar.jpg';
  pageSize = 5;
  page: number;
  loading: boolean;

  isLogged: boolean;
  loggedUserId: number;
  isLoggedSubscription: Subscription;
  loggedUser: User;

  @Input() reviewId: number;
  reviewComments: BookReviewComment[];
  ableToExpand: boolean;

  constructor( private bookReviewCommentService: BookReviewCommentService,
               private accountService: AccountService,
               private route: ActivatedRoute,
               private store: Store<State>) { }

  ngOnInit() {
    this.page = 1;
    this.reviewComments = [];
    this.ableToExpand = true;
    this.loading = true;

    this.getReviewComment();
  }

  ngOnDestroy(): void {
    if (this.isLoggedSubscription) {
      this.isLoggedSubscription.unsubscribe();
    }
  }

  getReviewComment(): void {
    this.loading = true;
    const tmpComments: BookReviewComment[] = [];
    const doneComments = {};

    this.isLoggedSubscription = this.store.select('user').pipe(
      switchMap((reducer: UserState) => {
        this.isLogged = reducer.login;
        this.loggedUserId = reducer.id;
        if (this.isLogged) {
          return this.accountService.getUserById(reducer.id);
        }
        const emptyUser: User = {userId: -1, email: '', photoPath: '', fullName: '', createdAt: '', enabled: false, roles: {name: ''}};
        return of(emptyUser);
      }),
      switchMap((user: User) => {
        if (user.userId !== -1) {
          this.loggedUser = user;
        }
        return this.bookReviewCommentService.getBookReviewComments(this.reviewId, this.page, this.pageSize);
      }),
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
      switchMap((reviewComment: BookReviewComment) => {
        tmpComments.push(reviewComment);
        return this.accountService.getUserById(reviewComment.userId);
      }),
      map((author: User) => {
        this.loading = false;
        const comments = tmpComments.filter(value => value.userId === author.userId);
        comments
          .filter(comment => doneComments[comment.commentId] == null)
          .forEach((comment) => {
            doneComments[comment.commentId] = true;
            comment.author = author;
            this.reviewComments.unshift(comment);
          });
      }),
    ).subscribe();
  }
  expandReviewsComments(): void {
    this.page += 1;
    this.getReviewComment();
  }
  sendComment(commentArea: HTMLTextAreaElement): void {
    if (commentArea.value === '') {
      return;
    }
    const newComment: BookReviewComment = {
      commentId: -1,
      userId: this.loggedUserId,
      bookReviewId: this.reviewId,
      content: commentArea.value,
      creationTime: null,
      author: null
    };
    commentArea.value = '';
    this.bookReviewCommentService.addReviewComment(newComment).pipe(
      flatMap((comment: BookReviewComment) => {
        return this.accountService.getUserById(comment.userId);
      }),
      map((user: User) => {
        newComment.author = user;
      }),
      )
      .subscribe(() => {
        newComment.creationTime = new Date();
        this.reviewComments.push(newComment);
      });
  }
}
