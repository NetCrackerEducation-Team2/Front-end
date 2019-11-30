import { Component, OnInit } from '@angular/core';
import {Page} from '../../models/page';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../service/account.service';
import {RecommendationsService} from '../../service/recommendations.service';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo>;
  userId: number;

  constructor(private bookPresentationService: BookPresentationService,
              private recommendationsService: RecommendationsService,
              private accountService: AccountService) { }

  ngOnInit() {
    //this.userId = this.accountService.getCurrentUser().userId;
    this.userId = 819;
    this.recommendationsService.prepareRecommendations(this.userId, 50);
    this.resetPaginator();
    this.searchPage();
  }

  searchPage(){
    this.pageLoading = true;
    this.recommendationsService.getRecommendations(this.userId, this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return {
          currentPage: page.currentPage,
          countPages: page.countPages,
          pageSize: page.pageSize,
          array: page.array.map(book => {
            return {
              title: book.title,
              subtitle: this.bookPresentationService.getBookSubtitle(book),
              photo: this.bookPresentationService.getBookPhoto(book),
              itemId: null,
              publish: null,
              contentElements: [
                {contentInfoId: 1, title: "Genres:", content: this.bookPresentationService.getBookGenresString(book, 3)},
                {contentInfoId: 2, title: "Authors:", content: this.bookPresentationService.getBookAuthorsString(book, 3)}
              ],
              actionElements: [
                {buttonInfoId: 1, name: 'View', url: book.slug, disabled: false, clickFunction: () => {}}
              ],
              listItemCallback: null,
              additionalParams: null
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
