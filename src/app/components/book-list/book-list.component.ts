import {Component, Input, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() listItemInfos: ListItemInfo[];

  constructor() { }

  ngOnInit() {

  }

}
