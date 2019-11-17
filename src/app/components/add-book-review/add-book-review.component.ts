import {Component, OnInit} from '@angular/core';
import {Announcement} from '../../models/announcement';
import {AnnouncementService} from '../../service/announcement.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-add-book-review',
  templateUrl: './add-book-review.component.html',
  styleUrls: ['./add-book-review.component.css']
})
export class AddBookReviewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('Book id = ', this.activatedRoute.snapshot.paramMap.get('bookId'));
  }

}
