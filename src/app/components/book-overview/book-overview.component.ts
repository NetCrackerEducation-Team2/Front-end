import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import { ActivatedRoute } from '@angular/router';
import {Book} from '../../models/book';



@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {

  book: Book;
  slug: string;


  constructor(private bookService: BookService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.bookService.getBook(slug)
      .subscribe(book => this.book = book);
  }

}
