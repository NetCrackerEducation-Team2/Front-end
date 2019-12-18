import {Component, OnInit, OnDestroy} from '@angular/core';
import {Page} from '../../models/page';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {PageEvent} from '@angular/material';
import {AccountService} from '../../service/account.service';
import {RecommendationsService} from '../../service/recommendations.service';
import {switchMap} from 'rxjs/operators';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  pageLoading: boolean;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo>;
  recommendations: Page<Book>[];

  constructor(private bookPresentationService: BookPresentationService,
              private recommendationsService: RecommendationsService,
              private accountService: AccountService) {
  }

  ngOnInit() {
    let user = this.accountService.getCurrentUser();
    this.resetPaginator();
    this.recommendationsService.prepareRecommendations(user.userId, 25)
      .pipe(switchMap(res =>
        this.recommendationsService.getRecommendations(user.userId, this.selectedPage.currentPage, this.selectedPage.pageSize))
      ).subscribe(recommendations => {
      this.recommendations = recommendations;
      this.searchPage();
    });
  }

  searchPage() {
    this.pageLoading = true;
    let page = this.recommendations[this.selectedPage.currentPage];
    this.selectedPage = {
      currentPage: page.currentPage,
      countPages: page.countPages,
      pageSize: page.pageSize,
      array: page.array.map(book => {
        return {
          title: book.title,
          subtitle: this.bookPresentationService.getBookSubtitle(book),
          photoPath: book.photoPath,
          itemId: null,
          publish: null,
          contentElements: [
            {contentInfoId: 1, title: 'Genres:', content: this.bookPresentationService.getBookGenresString(book, 3)},
            {contentInfoId: 2, title: 'Authors:', content: this.bookPresentationService.getBookAuthorsString(book, 3)}
          ],
          actionElements: [
            {
              buttonInfoId: 1, name: 'View', url: book.slug, disabled: false, clickFunction: () => {
              }
            }
          ],
          listItemCallback: null,
          additionalParams: null
        };
      })
    };
    this.pageLoading = false;
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
