import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from '../../service/announcement.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

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
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      this.isError = true;
      return;
    }
    console.log('UserId from local storage: ', user.userId);
    this.announcementsService.createAnnouncement(this.announcement.title, this.announcement.description, user.userId)
      .subscribe(
        (response) => {
          this.isError = false;
          this.router.navigate(['/announcements']);
        },
        (error: HttpErrorResponse) => {
          this.isError = true;
          // TODO add error handling here
        }
      );
  }

}
