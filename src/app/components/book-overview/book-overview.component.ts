import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

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
  scourcePhoto: SafeUrl;
  loadfinished = 0;
  publishingHouse: string;
  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.getBookOverview();
  }

  getBookOverview(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.bookService.getBook(slug).pipe(
      flatMap((resBook: Book) => {
        this.book = resBook;
        this.authors = this.bookService.getBookGenresString(this.book, this.book.authors.length);
        this.genres = this.bookService.getBookAuthorsString(this.book, this.book.genres.length);

        this.scourcePhoto = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.book.photo);
        this.publishingHouse = resBook.publsihingHouse;
        return this.bookService.getBookOverview(this.book.bookId);
      }),
      ).subscribe((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        this.loadfinished = 1;
    });
  }
}

