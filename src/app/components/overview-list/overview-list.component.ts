import { Component, OnInit } from '@angular/core';
import {Page} from '../../models/page';
import {BookOverviewService} from '../../service/book-overview.service';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {map} from 'rxjs/operators';
import {BookOverviewPresentationService} from '../../service/presentation-services/book-overview-presentation.service';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.css']
})
export class OverviewListComponent implements OnInit {

  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo>;

  constructor(private route: ActivatedRoute,
              private bookOverviewService: BookOverviewService,
              private bookOverviewPresentationService: BookOverviewPresentationService) { }

  ngOnInit() {
    this.resetPaginator();
    this.searchPage();
  }

  searchPage() {
    const bookId = +this.route.snapshot.paramMap.get('bookId');
    this.pageLoading = true;
    this.bookOverviewService.getBookOverviewsByBook(bookId, this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return {
          currentPage: page.currentPage,
          countPages: page.countPages,
          pageSize: page.pageSize,
          array: page.array.map(bookOverview => {
            return {
              title: this.bookOverviewPresentationService.getBookOverviewTitle(bookOverview),
              subtitle: this.bookOverviewPresentationService.getBookOverviewSubtitle(bookOverview),
              photo: null,
              itemId: null,
              publish: null,
              contentElements: [
                {contentInfoId: 1, title: null, content: bookOverview.description},
              ],
              actionElements: [
                {buttonInfoId: 1, name: 'Publish', url: null, disabled: bookOverview.published,
                  clickFunction: () => {}}
              ],
              listItemCallback: null,
              additionalParams: new Map([
                ['published', bookOverview.published]
              ])
            };
          })
        };
      }))
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      });
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private resetPaginator() {
    this.selectedPage = this.emptyPage;
  }
}
