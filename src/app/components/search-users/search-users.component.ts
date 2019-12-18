import {Component, OnInit, OnDestroy} from '@angular/core';
import {Book} from '../../models/book';
import {Page} from '../../models/page';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../service/account.service';
import {User} from '../../models/user';
import {FriendService} from '../../service/friend.service';

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

  constructor(private accountService: AccountService, private friendService: FriendService) {
  }


  ngOnInit() {
    this.searchProcessing = false;
    this.selectedPage.array = [];
    this.wasSearch = false;
    this.resetPaginator();
    this.searchPage();
  }

  search(): void {
    if (this.searchExpression.length >= 2) {
      this.wasSearch = true;
      this.resetPaginator();
      this.searchPage();
    }
  }

  searchPage(): void {
    if (this.wasSearch) {
      this.searchProcessing = true;
      this.accountService.searchUsers(this.searchExpression, this.selectedPage.currentPage, this.selectedPage.pageSize)
        .subscribe(selectedPage => {
          this.searchProcessing = false;
          this.selectedPage = selectedPage;
        });
    } else {
      console.log('Loading friends...');
      // load friends list
      this.searchProcessing = true;
      this.friendService.getFriends(this.selectedPage.currentPage, this.selectedPage.pageSize).subscribe(
        selectedPage => {
          this.selectedPage = selectedPage;
          this.searchProcessing = false;
          console.log('Successfully loaded friends');
        }
      );
    }
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
