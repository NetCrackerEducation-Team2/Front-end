import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from '../../service/review.service';
import {Book} from '../../models/book';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SnackBarService} from '../../service/presentation-services/snackBar.service';

@Component({
  selector: 'app-add-book-review',
  templateUrl: './add-book-review.component.html',
  styleUrls: ['./add-book-review.component.css']
})
export class AddBookReviewComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  review = {rating: 5, description: ''};
  private createReviewSubscription: Subscription;
  private sendButtonDisabled;

  constructor(private reviewService: ReviewService, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.sendButtonDisabled = false;
  }


  ngOnDestroy(): void {
    if (this.createReviewSubscription) {
      this.createReviewSubscription.unsubscribe();
    }
  }


  sendReview() {
    this.sendButtonDisabled = true;
    this.createReviewSubscription = this.reviewService
      .createReview(this.review.rating, this.review.description, this.book.bookId).subscribe(
      (response) => {
        this.sendButtonDisabled = false;
        if (response) {
          this.snackBarService.openSuccessSnackBar('Book review has been successfully sent');
          this.review = {rating: 5, description: ''};
        }
      });
  }
}
