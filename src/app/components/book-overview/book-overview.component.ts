import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {concat} from 'rxjs';


@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {

  book: Book;
  bookOverview: BookOverview;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // this.getBookOverview();
  }

  /*getBookOverview(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    alert('Before!');
    this.bookService.getBook(slug)
      .flatMap((resBook: Book) => {
        return resBook.bookId;
      })
      .flatMap((bookId: number) => {
      })
      .subscribe((res2) => {
      });
  } */
}


/*
concat(
    this.bookService.getBook(slug).pipe(
      flatMap((respBook: Book) => {
        this.book = respBook;
        this.bookService.getBookOverview(respBook.bookId);
      }).subscribe((respOverview: BookOverview) => {
      this.bookOverview = respOverview;
    })));
 */
