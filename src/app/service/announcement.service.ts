import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { ANNOUNCEMENTS } from '../mocks/mock-announcement';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor() { }

  getAnnouncements(): Observable<Announcement[]> {
    return of(ANNOUNCEMENTS);
  }

  getAnnouncement(id: number): Observable<Announcement> {
  // TODO: send the message _after_ fetching the hero
    return of(ANNOUNCEMENTS.find(announcement => announcement.announcement_id === id));
  }
}
