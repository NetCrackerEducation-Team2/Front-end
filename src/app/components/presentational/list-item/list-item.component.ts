import {Component, Input, OnInit} from '@angular/core';
import {ListItemInfo} from '../../../models/presentation-models/list-item-info';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() listItemInfo: ListItemInfo;

  constructor() { }

  ngOnInit() {
  }
}
