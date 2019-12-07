import {Component, Input, OnInit} from '@angular/core';
import {ListItemInfo} from '../../../models/presentation-models/list-item-info';

@Component({
  selector: 'app-list-item-publish',
  templateUrl: './list-item-publish.component.html',
  styleUrls: ['./list-item-publish.component.css']
})
export class ListItemPublishComponent implements OnInit {

  @Input() listItemInfo: ListItemInfo;

  constructor() { }

  ngOnInit() {
  }

}
