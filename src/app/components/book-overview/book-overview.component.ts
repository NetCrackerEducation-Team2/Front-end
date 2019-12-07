import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {flatMap} from 'rxjs/operators';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BookOverviewService} from '../../service/book-overview.service';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {

  book: Book;
  bookOverview: BookOverview;
  genres: string;
  authors: string;
  sourcePhoto: SafeUrl;
  loadfinished = 0;
  publishingHouse: string;
  constructor(private bookService: BookService,
              private bookPresentationService: BookPresentationService,
              private bookOverviewService: BookOverviewService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.getBookOverview();
  }

  getBookOverview(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.bookService.getBookBySlug(slug).pipe(
      flatMap((resBook: Book) => {
        this.book = resBook;
        this.authors = this.bookPresentationService.getBookGenresString(this.book, this.book.authors.length);
        this.genres = this.bookPresentationService.getBookAuthorsString(this.book, this.book.genres.length);

        this.sourcePhoto = resBook.photoPath;
        this.publishingHouse = resBook.publishingHouse;
        return this.bookOverviewService.getPublishedBookOverview(this.book.bookId);
      }),
      ).subscribe((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        this.loadfinished = 1;
    });
  }
}

