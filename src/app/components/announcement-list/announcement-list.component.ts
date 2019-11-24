import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import {Page} from '../../models/page';
import { AnnouncementService } from '../../service/announcement.service';
import {PageEvent} from '@angular/material';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css'],
  providers: [DatePipe]
})
export class AnnouncementListComponent implements OnInit {

  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo>;

  constructor(public datePipe: DatePipe,
    private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.resetPaginator();
    this.searchPage();
  }

  searchPage(): void {
    this.pageLoading = true;
    this.announcementService.getAnnouncements(this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return {
          currentPage: page.currentPage,
          countPages: page.countPages,
          pageSize: page.pageSize,
          array: page.array.map(announcement => {
            return {
              title: announcement.title,
              subtitle: this.datePipe.transform(announcement.creationTime, 'd LLLL yyyy, h:mm'),
              photo: null,
              contentElements: [
                {contentInfoId: 1, title: null, content: announcement.description},
              ],
              actionElements: [
                {buttonInfoId: 1, name: "View", url: "/", disabled: false}
              ],
              listItemCallback: null,
              additionalParams: null
            };
          })
        }
      }))
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      })
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private resetPaginator(){
    this.selectedPage = this.emptyPage;
  }
}
