import {Component, OnInit, Input, Inject} from '@angular/core';
import {Announcement} from '../../models/announcement';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AnnouncementService} from '../../service/announcement.service';
import {DOCUMENT} from '@angular/common';
import {Activity} from "../../models/activity";

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {
  @Input() activity: Activity;
  theGoBackCallback: () => void;

  constructor() {
  }

  ngOnInit(): void {
  }
}
