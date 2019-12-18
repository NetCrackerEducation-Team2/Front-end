import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnouncementService} from '../../service/announcement.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../service/presentation-services/snackBar.service';
import {User} from '../../models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit, OnDestroy {

  announcement = {title: '', description: ''};
  awaitingResponse: boolean;
  private sendAnnouncementSubscription: Subscription;

  constructor(private announcementsService: AnnouncementService, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.awaitingResponse = false;
  }

  ngOnDestroy(): void {
    if (this.sendAnnouncementSubscription) {
      this.sendAnnouncementSubscription.unsubscribe();
    }
  }


  sendAnnouncement() {
    this.awaitingResponse = true;
    const user = this.getCurrentUser();
    this.sendAnnouncementSubscription = this.announcementsService
      .createAnnouncement(this.announcement.title, this.announcement.description, user.userId)
      .subscribe(
        (response) => {
          this.awaitingResponse = false;
          if (response) {
            this.snackBarService.openSuccessSnackBar('Announcement has been sent to moderators');
            this.router.navigate(['/announcements']);
          }
        }
      );
  }

  private  getCurrentUser(): User {
    try {
      return JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      this.snackBarService.openErrorSnackBar('Error! You need to re-login');
      return;
    }
  }
}
