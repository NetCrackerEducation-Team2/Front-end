import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {GenreService} from "../../service/genre.service";
import {AuthorService} from "../../service/author.service";
import { ActivatedRoute } from '@angular/router';
import {Book} from '../../models/book';
import {Author} from "../../models/author";
import {Genre} from "../../models/genre";
import {Page} from "../../models/page";


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
    this.getBook()
  }

  getBook(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.bookService.getBook(slug)
      .subscribe(book => this.book = book);
  }

}
