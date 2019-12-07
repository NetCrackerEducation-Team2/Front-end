import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from '../../service/announcement.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../service/presentation-services/snackBar.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  announcement = {title: '', description: ''};

  constructor(private announcementsService: AnnouncementService, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
  }

  sendAnnouncement() {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      this.snackBarService.openErrorSnackBar('Error! You need to re-login');
      return;
    }
    this.announcementsService.createAnnouncement(this.announcement.title, this.announcement.description, user.userId)
      .subscribe(
        (response) => {
          if (response) {
            this.snackBarService.openSuccessSnackBar('Announcement has been sent to moderators');
            this.router.navigate(['/announcements']);
          }
        }
      );
  }
}
