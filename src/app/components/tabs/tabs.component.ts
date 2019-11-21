import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex: number;

  constructor(private router: Router, private store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.store.select('appReducer').subscribe(state => {
       console.log('asd');
       console.log(state.roles);
       for (const role of state.roles) {
        switch (role) {
          case 'admin':
            state.accessMap.set('admin', true);
            console.log(state.accessMap.get(role));
            break;
          case 'superadmin':
            state.accessMap.set('superadmin', true);
            break;
          case 'moderatorForBooks':
            state.accessMap.set('moderatorForBooks', true);
            break;
          case 'moderatorForReviews':
            state.accessMap.set('moderatorForReviews', true);
            break;
          case 'moderatorForAnnouncements':
            state.accessMap.set('moderatorForAnnouncements', true);
            break;
        }
       }
       if (state.roles.length < 1) {
        state.accessMap.set('admin', false);
        state.accessMap.set('superadmin', false);
        state.accessMap.set('moderatorForBooks', false);
        state.accessMap.set('moderatorForReviews', false);
        state.accessMap.set('moderatorForAnnouncements', false);
       }
       state.accessMap.set('user', state.login);
       console.log(state.accessMap.get('user'), 'user app');
       console.log(state.accessMap.get('admin'), 'admin app');

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
          access: state.accessMap.get('user')
      }, {
          label: 'Manage Announcements ',
          link: './announcements-management',
          index: 3,
          access: state.accessMap.get('moderatorForAnnouncements') || state.accessMap.get('admin') || state.accessMap.get('superadmin')
      }, {
          label: 'Manage Reviews',
          link: './reviews-management',
          index: 4,
          access: state.accessMap.get('moderatorForReviews') || state.accessMap.get('admin') || state.accessMap.get('superadmin')
      }, {
          label: 'Manage Books',
          link: './books-management',
          index: 5,
          access: state.accessMap.get('moderatorForBooks') || state.accessMap.get('admin') || state.accessMap.get('superadmin')
      }, {
          label: 'Admin',
          link: './admin',
          index: 6,
          access: state.accessMap.get('admin') || state.accessMap.get('superadmin')
      }
  ];


    });





      }



}
