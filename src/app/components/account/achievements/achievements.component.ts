import {apiUrls} from '../../../../api-urls';
import {Page} from '../../../models/page';
import {Achievement} from '../../../models/achievement';
import {AchievementService} from '../../../service/achievement.service';
import {Subscription} from 'rxjs';
import {SocketHolder} from '../../../models/socket-holder';

import {PageEvent} from '@angular/material/paginator';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SnackBarService} from "../../../service/presentation-services/snackBar.service";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit, OnDestroy {

  @Input() profileId: number;

  selectedPage: Page<Achievement> = new Page<Achievement>();
  lengthAchievementArr: number;
  socketUrl!: string;
  socket!: SocketHolder;

  constructor(private achievementService: AchievementService,
              private snackBar: SnackBarService) {
    this.socketUrl = apiUrls.WEBSOCKET;
    this.socket = new SocketHolder(this.socketUrl);
  }

  ngOnInit() {
    this.openSocketConnection();

    this.achievementService.getAchievementsByUserId(this.profileId)
      .subscribe(page => this.selectedPage = page);

    this.achievementService.countAchievementsByUserId(this.profileId)
      .subscribe(length => this.lengthAchievementArr = length);
  }

  openSocketConnection() {
    let subscription: Subscription;
    this.socket.stompClient.connect({}, (frame) => {
      console.log('Frame : ', frame);
      this.socket.stompClient.subscribe(`/topic/achievements/${this.profileId}`, newAchievementId => {
        console.log('Message : ', newAchievementId);
        subscription = this.achievementService.getAchievementsByUserId(this.profileId)
          .subscribe(page => {
            this.selectedPage = page;
            this.lengthAchievementArr++;
            this.snackBar.openSuccessSnackBar('You got new achievement!');
          });
      });
    });
    return subscription;
  }

  getPaginatorData(event: PageEvent) {
    // next page is wanted to be shown
    if (event.pageIndex === this.selectedPage.currentPage) {
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

  ngOnDestroy(): void {
    console.log('destroying `achievements` component...');
    this.socket.webSocket.close();
  }
}
