import {Component, Input, OnInit} from '@angular/core';
import {BookOverview} from '../../models/book-overview';

@Component({
  selector: 'app-overview-admins-item',
  templateUrl: './overview-admins-item.component.html',
  styleUrls: ['./overview-admins-item.component.css']
})
export class OverviewAdminsItemComponent implements OnInit {
  @Input() bookOverview: BookOverview;
  constructor() { }

  ngOnInit() {
  }

}
