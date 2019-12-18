import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {flatMap} from 'rxjs/operators';
import {BookOverviewService} from '../../service/book-overview.service';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {Store} from '@ngrx/store';
import {State} from '../../state/app.state';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit, OnDestroy {

  book: Book;
  bookOverview: BookOverview;
  genres: string;
  authors: string;
  loaded: boolean;
  isLogged: boolean;
  isLoggedSubscription: Subscription;

  constructor(private bookService: BookService,
              private bookPresentationService: BookPresentationService,
              private bookOverviewService: BookOverviewService,
              private route: ActivatedRoute,
              private store: Store<State>) {}

  ngOnInit() {
    this.getBookOverview();
    this.isLoggedSubscription = this.store.select('user').subscribe(reducer => {this.isLogged = reducer.login; } );
  }

  ngOnDestroy(): void {
    if (this.isLoggedSubscription) {
      this.isLoggedSubscription.unsubscribe();
    }
  }


  getBookOverview(): void {
    this.loaded = false;
    const slug = this.route.snapshot.paramMap.get('slug');
    this.bookService.getBookBySlug(slug).pipe(
      flatMap((resBook: Book) => {
        this.book = resBook;
        this.authors = this.bookPresentationService.getBookGenresString(this.book, this.book.authors.length);
        this.genres = this.bookPresentationService.getBookAuthorsString(this.book, this.book.genres.length);
        return this.bookOverviewService.getPublishedBookOverview(this.book.bookId);
      }),
      ).subscribe((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        this.loaded = true;
    });
  }
}

