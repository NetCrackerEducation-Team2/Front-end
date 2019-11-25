import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {Book} from '../../models/book';
import {UsersBooksService} from '../../service/users-books-service';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {UsersBook} from '../../models/users-book';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {of} from 'rxjs';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-personal-booklist',
  templateUrl: './personal-booklist.component.html',
  styleUrls: ['./personal-booklist.component.css']
})
export class PersonalBooklistComponent implements OnInit {
  userId = 832; //Number(localStorage.getItem('currentuser'));
  emptyPage: Page<ListItemInfo>;
  selectedPage: Page<ListItemInfo>;

  constructor(private accountService: AccountService,
              private usersBooksService: UsersBooksService,
              private bookService: BookService,
              private bookPresentationService: BookPresentationService,
  ) { }

  ngOnInit() {
    this.emptyPage = {currentPage: 1, pageSize: 5, countPages: 0, array: []};
    this.selectedPage = {currentPage: 1, pageSize: 5, countPages: 0, array: []};
    this.loadPage();
  }

  loadPage(): void  {
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
    switchMap((usersBook: UsersBook) => {
      return this.bookService.getBookById(usersBook.bookId);
    }),
    ).subscribe((book: Book) => {
      this.selectedPage.array.push({
        title: book.title,
        subtitle: this.bookPresentationService.getBookSubtitle(book),
        photo: this.bookPresentationService.getBookPhoto(book),
        contentElements: [
          {contentInfoId: 1, title: 'Genres:', content: this.bookPresentationService.getBookGenresString(book, 3)},
          {contentInfoId: 2, title: 'Authors:', content: this.bookPresentationService.getBookAuthorsString(book, 3)}
        ],
        actionElements: [
          {buttonInfoId: 1, name: 'View', url: book.slug, disabled: false},
          {buttonInfoId: 2, name: 'View Overviews', url: 'book-overviews/' + book.bookId, disabled: false}
        ],
        listItemCallback: null,
        additionalParams: null
      });
      console.log(JSON.stringify(this.selectedPage));
    });
  }
  handlePage(event?: PageEvent): void {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.loadPage();
  }
  private resetPaginator(): void {
    this.selectedPage = this.emptyPage;
  }
}
