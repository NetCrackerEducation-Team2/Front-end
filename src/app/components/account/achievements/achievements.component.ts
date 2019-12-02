import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Page} from '../../../models/page';
import {Achievement} from '../../../models/achievement';
import {AchievementService} from '../../../service/achievement.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  @Input() profileId: number;

  selectedPage: Page<Achievement> = new Page<Achievement>();
  lengthAchievementArr: number;

  constructor(private achievementService: AchievementService) {
    // this.arr = [
    //   'Read 50 books. Today',
    //   'Started following user "Alexander Pushkin". Yesterday',
    //   'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
    //   'Started reading Bible. 03.11.2019',
    //   'Some example achievement. 02.11.2019',
    //   'Yet another one. 01.11.2019',
    //   'Registered! 29.10.2019',
    //   'Read 50 books. Today',
    //   'Started following user "Alexander Pushkin". Yesterday',
    //   'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
    //   'Started reading Bible. 03.11.2019',
    //   'Some example achievement. 02.11.2019',
    //   'Yet another one. 01.11.2019',
    //   'Registered! 29.10.2019',
    //   'Read 50 books. Today',
    //   'Started following user "Alexander Pushkin". Yesterday',
    //   'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
    //   'Started reading Bible. 03.11.2019',
    //   'Some example achievement. 02.11.2019',
    //   'Yet another one. 01.11.2019',
    //   'Registered! 29.10.2019',
    //   'Read 50 books. Today',
    //   'Started following user "Alexander Pushkin". Yesterday',
    //   'Finished reading the "War and Peace" L.Tolstoy. 03.11.2019',
    //   'Started reading Bible. 03.11.2019',
    //   'Some example achievement. 02.11.2019',
    //   'Yet another one. 01.11.2019',
    //   'Registered! 29.10.2019',
    // ];
  }

  ngOnInit() {
    // connect to socket
    const ws = new SockJS('http://localhost:8081/socket');
    const stompClient = Stomp.over(ws);
    stompClient.connect({}, (frame) => {
      stompClient.subscribe(`/topic/achievements/${this.profileId}`, (message) => {
        console.log('Message : ' + message.body);
        //   this.achievementService.getAchievementById(message.body)
        //     .subscribe(achievement => {
        //       this.selectedPage.array.unshift(achievement);
        //     });
        this.achievementService.getAchievementsByUserId(this.profileId)
          .subscribe(page => this.selectedPage = page);
        this.lengthAchievementArr++;
      });
    });

    this.achievementService.getAchievementsByUserId(this.profileId)
      .subscribe(page => this.selectedPage = page);

    this.achievementService.countAchievementsByUserId(this.profileId)
      .subscribe(length => this.lengthAchievementArr = length);
  }

  getPaginatorData(event: PageEvent) {
    // next page is wanted to be shown
    if (event.pageIndex === this.selectedPage.currentPage) {
      console.log('next');
      const nextPage = this.selectedPage.currentPage + 1;
      this.achievementService.getAchievementsByUserId(this.profileId, nextPage)
        .subscribe(page => this.selectedPage = page);
    } else {
      const prevPage = this.selectedPage.currentPage - 1;
      this.achievementService.getAchievementsByUserId(this.profileId, prevPage)
        .subscribe(page => {
          this.selectedPage = page;
        });
    }
  }
}
