import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() page: Page<Book>;

  constructor(public bookService: BookService) { }

  ngOnInit() {

  }

}
