import { Injectable } from '@angular/core';
import { NOTIFICATIONS } from '../mocks/mock-notifications';
import { Observable, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  getNotifications(): Observable<any>  {
    // Get from mock
    return of(NOTIFICATIONS);
  }
}
