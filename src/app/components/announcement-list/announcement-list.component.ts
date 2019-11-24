import {Component, OnInit} from '@angular/core';
import {Announcement} from '../../models/announcement';
import {Page} from '../../models/page';
import {AnnouncementService} from '../../service/announcement.service';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {
  selectedPage: Page<Announcement> = new Page<Announcement>();


  constructor(private announcementService: AnnouncementService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(result => this.selectedPage = result);
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.getAnnouncements();
  }

  public isLogged(): boolean {
    return this.accountService.getToken() !== null;
  }
}
