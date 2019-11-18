import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {BookOverview} from '../../models/book-overview';
import {mergeMap} from "rxjs/operators";

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
    this.getBookOverview();
  }

  getBookOverview(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.bookService.getBook(slug).pipe(
      mergeMap((resBook: Book) => {
        this.book = resBook;
        return this.bookService.getBookOverview(this.book.bookId);
      }),
      ).subscribe((resOverview: BookOverview) => {
        this.bookOverview = resOverview;
        //console.log("###############");
        //console.log(JSON.stringify(this.book));
        //console.log(JSON.stringify(this.bookOverview));
        //console.log("$$$$$$$$$$$$$$$")
    });
  }
}
