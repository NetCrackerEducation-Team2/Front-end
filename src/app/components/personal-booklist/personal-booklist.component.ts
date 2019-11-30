import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {Book} from '../../models/book';
import {UsersBooksService} from '../../service/users-books-service';
import {flatMap, map} from 'rxjs/operators';
import {UsersBook} from '../../models/users-book';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-personal-booklist',
  templateUrl: './personal-booklist.component.html',
  styleUrls: ['./personal-booklist.component.css']
})
export class PersonalBooklistComponent implements OnInit {
  userId = 832;
  selectedPage: Page<ListItemInfo>;
  usersBooks: UsersBook[];
  books: Book[];
  loading = false;

  constructor(private accountService: AccountService,
              private usersBooksService: UsersBooksService,
              private bookService: BookService,
              private bookPresentationService: BookPresentationService,
  ) { }

  ngOnInit() {
    this.selectedPage = {currentPage: 1, pageSize: 5, countPages: 0, array: []};
    this.usersBooks = [];
    this.books = [];
    this.loadPage();
  }

  loadPage(): void  {
    this.loading = true;
    this.selectedPage.array = [];

    this.usersBooksService.getUsersBookPage(this.userId, this.selectedPage.currentPage, this.selectedPage.pageSize).pipe(
    map((response: Page<UsersBook> ) => {
      this.selectedPage.countPages = response.countPages;
      this.selectedPage.currentPage = response.currentPage;
      this.selectedPage.pageSize = response.pageSize;
      return response.array;
    }),
    flatMap((userBook: UsersBook[]) => {
      return userBook;
    }),
    flatMap((usersBook: UsersBook) => {
      this.usersBooks.push(usersBook);
      return this.bookService.getBookById(usersBook.bookId);
    }),
    ).subscribe((book: Book) => {
      this.books.push(book);
      const res: ListItemInfo = {
        title: book.title,
        subtitle: this.bookPresentationService.getBookSubtitle(book),
        photo: this.bookPresentationService.getBookPhoto(book),
        itemId: null,
        publish: null,
        contentElements: [
          {contentInfoId: 1, title: 'Genres:', content: this.bookPresentationService.getBookGenresString(book, 3)},
          {contentInfoId: 2, title: 'Authors:', content: this.bookPresentationService.getBookAuthorsString(book, 3)}
        ],
        actionElements: [
          {buttonInfoId: 1, name: 'View', url: book.slug, disabled: false, clickFunction: () => {}},
        ],
        listItemCallback: null,
        additionalParams: null
      };
      const usersBook = this.usersBooks.filter(value => value.bookId === book.bookId)[0];
      if (usersBook.favoriteMark) {
        res.actionElements.push(
          {buttonInfoId: 2, name: 'Remove from Favorite', url: book.slug, disabled: false, clickFunction: () => {}}
        );
      } else {
        res.actionElements.push(
          {buttonInfoId: 2, name: 'Add to Favorite', url: book.slug, disabled: false, clickFunction: () => {}}
        );
      }
      if (usersBook.readMark) {
        res.actionElements.push(
          {buttonInfoId: 3, name: 'Remove read mark', url: book.slug, disabled: false, clickFunction: () => {}}
        );
      } else {
        res.actionElements.push(
          {buttonInfoId: 3, name: 'Set read mark', url: book.slug, disabled: false, clickFunction: () => {}}
        );
      }
      this.selectedPage.array.push(res);
      this.loading = false;
    });
  }
  handlePage(event?: PageEvent): void {
    if (this.loading) {
      return;
    }
    this.selectedPage.currentPage = event.pageIndex + 1;
    this.selectedPage.pageSize = event.pageSize;
    this.loadPage();
  }
}
