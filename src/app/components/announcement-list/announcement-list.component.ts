import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { AnnouncementService } from '../../service/announcement.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {
  page: {
    currentPage:number,
    countPages: number,
    array: Announcement[]
  }


  constructor(private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
        .subscribe(result => this.page = result);
  }

}
