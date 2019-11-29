import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() page: Page<User>;

  constructor() { }

  ngOnInit() {

  }

}
