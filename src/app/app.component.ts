import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NetCrackerEducationFrontend';
  navLinks: any[];
  activeLinkIndex: number;
  user = true;
  moderatorForAnnouncements = false;
  moderatorForReviews = false;
  moderatorForBookOverview = false;
  moderator = false;
  admin = false;
  superAdmin = true;

  constructor(private router: Router) {

   /* if (this.superAdmin) {
      this.admin = true;
    }

    if ((this.moderatorForAnnouncements && this.moderatorForBookOverview && this.moderatorForReviews) || this.admin) {
      this.moderator = true;
    }

    if (this.moderator) {

      this.moderatorForAnnouncements = true;
      this.moderatorForBookOverview = true;
      this.moderatorForReviews = true;

    }*/

    this.navLinks = [
        {
            label: 'Library',
            link: './',
            index: 0,
            access: true
        }, {
            label: 'Announcements',
            link: './announcements',
            index: 1,
            access: true
        }, {
            label: 'Profile',
            link: './profile',
            index: 2,
            access: this.user
        }, {
            label: 'Manage Announcements ',
            link: './announcements-management',
            index: 3,
            access: this.moderatorForAnnouncements || this.moderator || this.admin || this.superAdmin
        }, {
            label: 'Manage Reviews',
            link: './reviews-management',
            index: 4,
            access: this.moderatorForReviews || this.moderator || this.admin || this.superAdmin
          }, {
        }, {
            label: 'Manage Books',
            link: './books-management',
            index: 5,
            access: this.moderatorForBookOverview || this.moderator || this.admin || this.superAdmin
          }, {
        }, {
            label: 'Admin',
            link: './admin',
            index: 6,
            access: this.admin || this.superAdmin
        }, {
            label: 'SuperAdmin',
            link: './super-admin',
            index: 7,
            access: this.superAdmin
        }
    ];

}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
});
}

  }
