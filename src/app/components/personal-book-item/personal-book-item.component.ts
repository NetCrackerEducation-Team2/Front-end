import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-personal-book-item',
  templateUrl: './personal-book-item.component.html',
  styleUrls: ['./personal-book-item.component.css']
})
export class PersonalBookItemComponent implements OnInit {
  userId = 1007;

  constructor( private accountService: AccountService
  ) { }

  ngOnInit() {

  }

  loadList(): void {

  }
}
