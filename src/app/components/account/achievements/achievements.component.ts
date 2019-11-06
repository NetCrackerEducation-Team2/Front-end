import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  startIndex: number;
  endIndex: number;
  pageSize: number;
  pageIndex: number;

  arr: string[];

  constructor() {
    this.startIndex = 0;
    this.pageSize = 5;
    this.endIndex = this.pageSize;
    this.pageIndex = 0;

    this.arr = [
      'Read 50 books. Today',
      'Started following user "Alexander Pushkin". Yesterday',
      'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
      'Started reading Bible. 03.11.2019',
      'Some example achievement. 02.11.2019',
      'Yet another one. 01.11.2019',
      'Registered! 29.10.2019',
      'Read 50 books. Today',
      'Started following user "Alexander Pushkin". Yesterday',
      'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
      'Started reading Bible. 03.11.2019',
      'Some example achievement. 02.11.2019',
      'Yet another one. 01.11.2019',
      'Registered! 29.10.2019',
      'Read 50 books. Today',
      'Started following user "Alexander Pushkin". Yesterday',
      'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
      'Started reading Bible. 03.11.2019',
      'Some example achievement. 02.11.2019',
      'Yet another one. 01.11.2019',
      'Registered! 29.10.2019',
      'Read 50 books. Today',
      'Started following user "Alexander Pushkin". Yesterday',
      'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
      'Started reading Bible. 03.11.2019',
      'Some example achievement. 02.11.2019',
      'Yet another one. 01.11.2019',
      'Registered! 29.10.2019',
    ];
  }

  ngOnInit() {
  }

  getPaginatorData(event: PageEvent) {
    // next page wanted
    if (event.pageIndex === this.pageIndex + 1) {
      this.startIndex = this.startIndex + this.pageSize;
      this.endIndex = this.endIndex + this.pageSize;
    } // previous page wanted
    else {
      this.startIndex = this.startIndex - this.pageSize;
      this.endIndex = this.endIndex - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

}
