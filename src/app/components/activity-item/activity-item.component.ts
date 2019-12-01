import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../models/activity';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css'],
  providers: [DatePipe]
})
export class ActivityItemComponent implements OnInit {
  @Input() activity: Activity;
  listItemInfo: ListItemInfo;
  theGoBackCallback: () => void;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.listItemInfo = {
      title: this.activity.description,
      subtitle: this.datePipe.transform(this.activity.creationTime, 'd LLLL yyyy, h:mm'),
      actionElements: null,
      additionalParams: null,
      contentElements: null,
      itemId: this.activity.activityId,
      listItemCallback: null,
      photo: null,
      publish: null
    };
  }
}
