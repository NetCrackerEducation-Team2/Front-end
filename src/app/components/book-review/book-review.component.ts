import {Component, Input, OnInit} from '@angular/core';
import {BookReview} from '../../models/book-review';
import {BookReviewComment} from '../../models/book-review-comment';
import {BookReviewService} from '../../service/book-review.service';
import {map, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

  constructor( private bookReviewService: BookReviewService
  ) { }

  ngOnInit() {
    this.avatartPath = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
    this.fullName = 'Ivanov Ivan';

    this.size = 5;
    this.showReviews(1, this.size);
  }

  showReviews(from: number, count: number): void {
    this.showCommentsFlag = [];
    for (let i = 0; i < this.size; i++) {
      this.showCommentsFlag.push(false);
    }
    this.bookReviewService.getBookReview(this.bookId, from, count).pipe(
      map((respList: BookReview[]) => {
        return respList;
      })
    ).subscribe((reviewList: BookReview[]) => {
      this.reviews = reviewList['array'];
    });
  }
  expandReviews(): void {
    const oldSize = this.size;
    this.size += 5;
    this.showReviews(oldSize, this.size);
  }

  showComments(ind: number): void {
    this.showCommentsFlag[ind] = true;
  }
  hideComments(ind: number): void {
    this.showCommentsFlag[ind] = false;
  }
}
