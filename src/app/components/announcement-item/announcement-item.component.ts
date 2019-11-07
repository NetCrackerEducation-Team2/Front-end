import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AnnouncementService } from '../../service/announcement.service';

@Component({
  selector: 'app-announcement-item',
  templateUrl: './announcement-item.component.html',
  styleUrls: ['./announcement-item.component.css']
})
export class AnnouncementItemComponent implements OnInit {
  announcement: Announcement;


  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.announcementService.getAnnouncement(id)
      .subscribe(announcement => this.announcement = announcement);
  }

}
