import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {Book} from '../../models/book';
import {UsersBooksService} from '../../service/users-books-service';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {UsersBook} from '../../models/users-book';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-personal-booklist',
  templateUrl: './personal-booklist.component.html',
  styleUrls: ['./personal-booklist.component.css']
})
export class PersonalBooklistComponent implements OnInit {
  userId = 832;
  pageSize = 5;
  page: number;
  books: Book[];

  constructor(private accountService: AccountService,
              private usersBooksService: UsersBooksService,
              private bookService: BookService,
  ) { }

  ngOnInit() {
    this.page = 1;
    this.books = [];
    this.loadList();
  }

  loadList(): void {
    this.usersBooksService.getUsersBookPage(this.userId, this.page, this.pageSize).pipe(
      map((response: Page<UsersBook> ) => {
        return response.array;
      }),
      flatMap((userBooksList: UsersBook[]) => {
        return userBooksList;
      }),
      switchMap((userBook: UsersBook) => {
        console.log('ID = : ' + userBook.bookId);
        return this.bookService.getBookById(userBook.bookId);
      }),
      map((book: Book) => {
        console.log('Four: ' + JSON.stringify(Book));
        this.books.push(book);
      })
    ).subscribe();
  }
  expandReviews(): void {
    this.page += 1;
    this.loadList();
  }
}
