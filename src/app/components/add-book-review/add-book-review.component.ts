import {Component, OnInit} from '@angular/core';
import {Announcement} from '../../models/announcement';
import {AnnouncementService} from '../../service/announcement.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {StarRatingComponent} from 'ng-starrating';
import {ReviewService} from '../../service/review.service';

@Component({
  selector: 'app-add-book-review',
  templateUrl: './add-book-review.component.html',
  styleUrls: ['./add-book-review.component.css']
})
export class AddBookReviewComponent implements OnInit {
  review = {rating: 5, description: ''};
  bookId = null;

  constructor(private activatedRoute: ActivatedRoute, private reviewService: ReviewService, private router: Router) {
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
  }


  sendReview() {
    this.reviewService.createReview(this.review.rating, this.review.description, this.bookId).subscribe(
      (response) => {
        console.log('Successfully send review');
        this.router.navigate(['/book/id', this.bookId]);
      });
  }
}
