import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {
  @Input() activity: Activity;
  listItemInfo: ListItemInfo;
  theGoBackCallback: () => void;

  constructor() {
    // TODO asem format date here
    this.listItemInfo = {
      title: this.activity.description,
      subtitle: this.activity.creationTime,
      actionElements: null,
      additionalParams: null,
      contentElements: null,
      itemId: this.activity.activityId,
      listItemCallback: null,
      photo: null,
      publish: null
    };
  }

  ngOnInit(): void {
  }
}
