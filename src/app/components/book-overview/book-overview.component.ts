import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {flatMap} from 'rxjs/operators';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BookOverviewService} from '../../service/book-overview.service';

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
  loadFinished = 0;
  constructor(private bookService: BookService,
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
        this.authors = this.bookService.getBookGenresString(this.book, this.book.authors.length);
        this.genres = this.bookService.getBookAuthorsString(this.book, this.book.genres.length);
        this.sourcePhoto = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.book.photo);
        return this.bookOverviewService.getPublishedBookOverview(this.book.bookId);
      }),
      ).subscribe((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        this.loadFinished = 1;
    });
  }
}

