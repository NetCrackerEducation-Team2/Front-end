import {Component, Input, OnInit} from '@angular/core';
import {BookReview} from '../../models/book-review';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() bookReview: BookReview;

  constructor() { }

  ngOnInit() {
  }

}
