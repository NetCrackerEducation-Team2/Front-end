import {Component, Input, OnInit} from '@angular/core';
import {BookReview} from "../../models/book-review";
import {BookReviewService} from "../../service/book-review.service";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {
  @Input() bookId: number;
  reviews: BookReview[];
  size: number;

  avatartPath: string;
  fullName: string;

  constructor( private bookReviewService: BookReviewService
  ) { }

  ngOnInit() {
    this.avatartPath = "https://material.angular.io/assets/img/examples/shiba1.jpg";
    this.fullName = "Ivanov Ivan";

    this.size = 5;
    this.showReviews(1, this.size);
  }

  showReviews(from: number, count: number): void {
    this.bookReviewService.getBookReview(this.bookId, from, count)
      .subscribe((respList: BookReview[]) => {
        this.reviews = respList["array"];
      });
  }

  expandReviews(): void {
    let oldSize = this.size;
    this.size += 5;
    this.showReviews(oldSize, this.size);
  }
}
