import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {take } from 'rxjs/operators';
import {AppState} from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NetCrackerEducationFrontend';
  navLinks: any[];
  activeLinkIndex: number;
  accessMap = new Map([['moderatorForAnnouncements', false],
                       ['moderatorForReviews', false],
                       ['moderatorForBookOverview', false],
                       ['admin', false],
                       ['superadmin', false],
                       ['user', false]]);

  constructor(private router: Router, private store: Store<AppState>) {

}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });

  this.store.select('appReducer').subscribe(reducer => {
     console.log('asd');
     console.log(reducer.roles);
     for (const role of reducer.roles) {
      switch (role) {
        case 'admin':
          reducer.accessMap.set('admin', true);
          console.log(this.accessMap.get(role));
          break;
        case 'superadmin':
          reducer.accessMap.set('superadmin', true);
          break;
        case 'moderatorForBooks':
          reducer.accessMap.set('moderatorForBooks', true);
          break;
        case 'moderatorForReviews':
          reducer.accessMap.set('moderatorForReviews', true);
          break;
        case 'moderatorForAnnouncements':
          reducer.accessMap.set('moderatorForAnnouncements', true);
          break;
      }
     }
     if (reducer.roles.length < 1) {
      reducer.accessMap.set('admin', false);
      reducer.accessMap.set('superadmin', false);
      reducer.accessMap.set('moderatorForBooks', false);
      reducer.accessMap.set('moderatorForReviews', false);
      reducer.accessMap.set('moderatorForAnnouncements', false);
     }
     reducer.accessMap.set('user', reducer.login);
     console.log(reducer.accessMap.get('user'), 'user app');
     console.log(reducer.accessMap.get('admin'), 'admin app');

     console.log('navlinks');
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
        link: 'profile/:userId',
        index: 2,
        access: reducer.accessMap.get('user')
    }, {
        label: 'Manage Announcements ',
        link: './announcements-management',
        index: 3,
        access: reducer.accessMap.get('moderatorForAnnouncements') || reducer.accessMap.get('admin') || reducer.accessMap.get('superadmin')
    }, {
        label: 'Manage Reviews',
        link: './reviews-management',
        index: 4,
        access: reducer.accessMap.get('moderatorForReviews') || reducer.accessMap.get('admin') || reducer.accessMap.get('superadmin')
    }, {
        label: 'Manage Books',
        link: './books-management',
        index: 5,
        access: reducer.accessMap.get('moderatorForBooks') || reducer.accessMap.get('admin') || reducer.accessMap.get('superadmin')
    }, {
        label: 'Admin',
        link: './admin',
        index: 6,
        access: reducer.accessMap.get('admin') || reducer.accessMap.get('superadmin')
    }
];
     console.log(this.navLinks);


  });




    }




  }
