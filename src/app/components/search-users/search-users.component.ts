import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {Page} from '../../models/page';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../service/account.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  public searchExpression: string;
  public wasSearch: boolean;
  public searchProcessing: boolean;

  selectedPage: Page<User> = new Page<User>();
  window: Window = window;
  book: Book;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.searchProcessing = false;
    this.selectedPage.array = [];
    this.wasSearch = false;
    this.resetPaginator();
  }

  search(): void {
    if (this.searchExpression.length >= 2) {
      this.resetPaginator();
      this.searchPage();
    }
  }

  searchPage(): void {
    this.wasSearch = true;
    this.searchProcessing = true;
    this.accountService.searchUsers(this.searchExpression, this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(selectedPage => {
        this.searchProcessing = false;
        // FIXME use async pipe
        this.selectedPage = selectedPage;
      });
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private resetPaginator() {
    this.selectedPage.currentPage = 0;
    this.selectedPage.pageSize = 5;
    this.selectedPage.countPages = 0;
  }

}