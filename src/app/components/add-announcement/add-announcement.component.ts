import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from '../../service/announcement.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/user';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  announcement = {title: '', description: ''};
  isError = false;

  constructor(private announcementsService: AnnouncementService, private router: Router) {
  }

  ngOnInit() {
  }

  sendAnnouncement() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('UserId from local storage: ', user.userId);
    this.announcementsService.createAnnouncement(this.announcement.title, this.announcement.description, user.userId)
      .subscribe(
        (response) => {
          console.log('Response from announcement creation: ', response);
          this.isError = false;
          this.router.navigate(['/announcements']);
        },
        (error: HttpErrorResponse) => {
          console.log('Error from announcement creation: ', error);
          this.isError = true;
        }
      );
  }

}
