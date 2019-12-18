
import {Component, OnInit, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../service/date.service';
import {AnnouncementService} from '../../service/announcement.service';
import {Announcement} from '../../models/announcement';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


import {ANNOUNCEMENTS } from '../../mocks/mock-announcement';
interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
  announcements: Announcement[];
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]

})
export class CalendarComponent implements OnInit, OnDestroy {

  calendar: Week[];
  subscriptionDataService: Subscription;
  announcement: Announcement;
  announcements = [];
  subscriptions = [];
  constructor(private dateService: DateService, private announcementService: AnnouncementService) {
  }

  ngOnInit() {
    this.subscriptionDataService = this.dateService.date.subscribe(this.generate.bind(this));
  }


  ngOnDestroy() {
    this.subscriptionDataService.unsubscribe();

  }

  initCalendarAnnouncements(startDay: moment.Moment, endDay: moment.Moment) {
    const date = startDay.clone().subtract(1, 'day');

    while (date.isBefore(endDay, 'day')) {
      date.add(1, 'day').clone();
      this.announcementService.
      getPublishedAnnouncementByDate( date.format('YYYY') + '-' + date.format('MM') + '-' + date.format('DD')).
      subscribe(announcement => {this.announcements.push(new Announcement(  announcement.announcementId,
                                                                            announcement.title,
                                                                            announcement.description,
                                                                            announcement.userId,
                                                                            announcement.published,
                                                                            announcement.creationTime)); });

    }

  }

  unsubscribeAnnouncementSubscriptions() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');
    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];


    while (date.isBefore(endDay, 'day')) {

      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            const announcements = ANNOUNCEMENTS;

            return {
              value, active, disabled, selected, announcements
            };
          })
      });
    }

    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
  hasAnyAnnouncements(day: Day) {
    return !(day.announcements.length === 0);
  }

}
