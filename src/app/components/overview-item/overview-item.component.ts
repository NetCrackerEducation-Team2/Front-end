import {Component, Input} from '@angular/core';
import {ListItemComponent} from '../presentational/list-item/list-item.component';
import {BookService} from '../../service/book.service';
import {BookOverview} from '../../models/book-overview';
import {AccountService} from '../../service/account.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.css']
})
export class OverviewItemComponent extends ListItemComponent {

  @Input() bookOverview: BookOverview;

  constructor(private bookService: BookService,
              private accountService: AccountService) {
    super();
  }

  ngOnInit() {
    this.bookService.getBookTitleById(this.bookOverview.bookId)
      .subscribe(bookTitle => {
        this.title = "Overview on " + bookTitle;
      });
    this.accountService.getUserById(this.bookOverview.userId)
      .subscribe(user => {
        this.subtitle = "by " + (user as User).fullName;
      });
    this.description = this.bookOverview.description;
    this.url = this.bookOverview.bookOverviewId.toString();
  }

}
