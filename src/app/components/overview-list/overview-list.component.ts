import { Component, OnInit } from '@angular/core';
import {BookOverview} from "../../models/book-overview";
import {Page} from "../../models/page";
import {BookOverviewService} from "../../service/book-overview.service";
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.css']
})
export class OverviewListComponent implements OnInit {

  selectedPage: Page<BookOverview> = new Page();

  constructor(private route: ActivatedRoute,
              public bookOverviewService: BookOverviewService) { }

  ngOnInit() {
    this.resetPaginator();
    this.searchPage();
  }

  searchPage() {
    const bookId = +this.route.snapshot.paramMap.get('bookId');
    this.bookOverviewService.getBookOverviewsByBook(bookId, this.selectedPage.currentPage, this.selectedPage.pageSize)
      .subscribe(selectedPage => {
      this.selectedPage = selectedPage;
    });
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private resetPaginator(){
    this.selectedPage.currentPage = 0;
    this.selectedPage.pageSize = 5;
    this.selectedPage.countPages = 0;
  }
}
