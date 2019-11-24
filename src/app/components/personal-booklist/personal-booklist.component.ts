import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-personal-booklist',
  templateUrl: './personal-booklist.component.html',
  styleUrls: ['./personal-booklist.component.css']
})
export class PersonalBooklistComponent implements OnInit {
  userId = 1007;
  page = 1;
  pageSize = 5;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  loadList(): void {

  }
}
