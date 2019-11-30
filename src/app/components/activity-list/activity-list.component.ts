import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page';
import {PageEvent} from '@angular/material';
import {Activity} from '../../models/activity';
import {ActivityService} from '../../service/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  selectedPage: Page<Activity> = new Page<Activity>();


  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getLastFriendActivities(this.selectedPage.currentPage, this.selectedPage.pageSize).subscribe(currentPage => {
      this.selectedPage = currentPage;
    });
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getActivities();
  }
}
