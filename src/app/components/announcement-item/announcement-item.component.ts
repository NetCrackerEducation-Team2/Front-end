import {Component, Inject, Input, OnInit} from '@angular/core';
import {Announcement} from '../../models/announcement';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT, Location} from '@angular/common';
import {AnnouncementService} from '../../service/announcement.service';

@Component({
  selector: 'app-announcement-item',
  templateUrl: './announcement-item.component.html',
  styleUrls: ['./announcement-item.component.css']
})
export class AnnouncementItemComponent implements OnInit {
  @Input() announcement: Announcement;
  theGoBackCallback: () => void;
  theViewItemCallback: () => void;

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private location: Location,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // this.getAnnouncement();
    this.theGoBackCallback = this.goBack.bind(this);
    this.theViewItemCallback = this.viewItem.bind(this);
  }

  //  getAnnouncement(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.announcementService.getAnnouncement(id)
  //     .subscribe(announcement => this.announcement = announcement);
  // }

  public goBack(): void {
    this.location.back();
  }

  viewItem(url: string) {
    this.document.location.href = this.location.path();
  }
}
