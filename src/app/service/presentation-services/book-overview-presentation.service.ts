import { Injectable } from '@angular/core';
import {BookOverview} from '../../models/book-overview';

@Injectable({
  providedIn: 'root'
})
export class BookOverviewPresentationService {

  constructor() { }

  getBookOverviewTitle(bookOverview: BookOverview): string{
    return "Overview on " + bookOverview.book.title;
  }

  getBookOverviewSubtitle(bookOverview: BookOverview): string{
    return "by " + bookOverview.user.fullName;
  }
}
