import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {flatMap} from 'rxjs/operators';
import {BookOverviewService} from '../../service/book-overview.service';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {UsersBooksService} from '../../service/users-books-service';
import {UserBook} from '../../models/users-book';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit, OnDestroy {

  book: Book;
  bookOverview: BookOverview;
  userBook: UserBook;
  genres: string;
  authors: string;
  loaded: boolean;
  addBookDisabled: boolean;

  isLogged: boolean;
  loggedUserId: number;
  isLoggedSubscription: Subscription;

  constructor(private bookService: BookService,
              private bookPresentationService: BookPresentationService,
              private bookOverviewService: BookOverviewService,
              private usersBooksService: UsersBooksService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoggedSubscription = this.store.select('appReducer')
      .subscribe(reducer => {
        this.isLogged = reducer.login;
        this.loggedUserId = reducer.id;
      });
    this.addBookDisabled = false;
    this.getBookOverview();
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
        this.authors = this.bookPresentationService.getBookAuthorsString(this.book, this.book.authors.length);
        this.genres = this.bookPresentationService.getBookGenresString(this.book, this.book.genres.length);
        return this.bookOverviewService.getPublishedBookOverview(this.book.bookId);
      }),
      flatMap((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        this.loaded = true;
        return this.usersBooksService.getUserBook(this.book.bookId, this.loggedUserId);
      })
      ).subscribe((userBook: UserBook) => {
        if (userBook.userBookId !== -1 && this.isLogged) {
          this.userBook = userBook;
        }
    });
  }
  addToRead(): void {
    this.addBookDisabled = true;
    this.usersBooksService.addUsersBook(this.book, this.loggedUserId)
      .subscribe((newUsersBook: UserBook) => {
        this.addBookDisabled = false;
        this.userBook = newUsersBook;
      });
  }
  removeFromRead(): void {
    this.usersBooksService.deleteUsersBook(this.userBook.userBookId)
      .subscribe(() => {
        this.userBook = null;
      });
  }
}
