import {Component, OnInit, Input} from '@angular/core';
import {Book} from '../../models/book';
import {Page} from '../../models/page';
import {PageEvent} from '@angular/material';
import {AccountService} from "../../service/account.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  public searchExpression: string;
  public wasSearch: boolean;

  selectedPage: Page<User> = new Page<User>();
  window: Window = window;
  book: Book;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.selectedPage.array = [];
    this.wasSearch = false;
    this.resetPaginator();
  }

  search(): void {
    // FIXMe add search limit
    this.wasSearch = true;
    this.resetPaginator();
    this.searchPage();
  }

  searchPage(): void {
    console.log('Start searching users')
    this.accountService.searchUsers(this.searchExpression, this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(selectedPage => {
        console.log('Users founded')
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
