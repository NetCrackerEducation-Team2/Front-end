import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {flatMap} from 'rxjs/operators';
import {BookOverviewService} from '../../service/book-overview.service';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {UsersBooksService} from '../../service/users-books-service';
import {UserBook} from '../../models/users-book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {
  loggedUserId: number;
  isLogged: boolean;
  userBook: UserBook;

  book: Book;
  bookOverview: BookOverview;
  genres: string;
  authors: string;
  loaded: boolean;
  addBookDisabled: boolean;

  constructor(private bookService: BookService,
              private bookPresentationService: BookPresentationService,
              private bookOverviewService: BookOverviewService,
              private usersBooksService: UsersBooksService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.loggedUserId = 1007; // temporary
    this.isLogged = true; // temporary
    this.addBookDisabled = false;
    this.getBookOverview();
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
      flatMap((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        this.loaded = true;
        return this.usersBooksService.getUserBook(this.book.bookId, this.loggedUserId);
      })
      ).subscribe((userBook: UserBook) => {
        if (userBook.userBookId !== -1) {
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

