import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../models/book';
import {BookService} from '../../service/book.service';
import {ReviewService} from '../../service/review.service';
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.css']
})
export class BookProfileComponent implements OnInit {
  private book: Book;
  private isUser: boolean;
  review = {rating: 5, description: ''};

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private reviewService: ReviewService,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadBookInfo();
    this.isUser = this.accountService.getCurrentUser() != null;
  }

  goBackFunction() {
    this.router.navigate(['/']);
  }
  private loadBookInfo() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = this.route.snapshot.paramMap.get('id');
    if (slug) {
      this.bookService.getBookBySlug(slug).subscribe(book => {
        this.book = book;
      });
    } else {
      this.bookService.getBookById(Number(id)).subscribe(book => {
        this.book = book;
      });
    }
  }

  sendReview() {
    this.reviewService.createReview(this.review.rating, this.review.description, this.book.bookId).subscribe(
      (response) => {
        console.log('Successfully send review');
        this.router.navigate(['/book/id', this.book.bookId]);
      });
  }
}
