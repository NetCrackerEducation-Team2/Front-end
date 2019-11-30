import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
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
          case 'ADMIN':
            state.accessMap.set('ADMIN', true);
            console.log(state.accessMap.get(role));
            break;
          case 'SUPER_ADMIN':
            state.accessMap.set('SUPER_ADMIN', true);
            break;
          case 'OVERVIEW_MODERATOR':
            state.accessMap.set('OVERVIEW_MODERATOR', true);
            break;
          case 'REVIEW_MODERATOR':
            state.accessMap.set('REVIEW_MODERATOR', true);
            break;
          case 'ANNOUNCEMENT_MODERATOR':
            state.accessMap.set('ANNOUNCEMENT_MODERATOR', true);
            break;
        }
      }
      if (state.roles.length < 1) {
        state.accessMap.set('ADMIN', false);
        state.accessMap.set('SUPER_ADMIN', false);
        state.accessMap.set('OVERVIEW_MODERATOR', false);
        state.accessMap.set('REVIEW_MODERATOR', false);
        state.accessMap.set('ANNOUNCEMENT_MODERATOR', false);
      }
      state.accessMap.set('user', state.login);
      console.log(state.accessMap.get('user'), 'user app');
      console.log(state.accessMap.get('ADMIN'), 'admin app');

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
          access: state.accessMap.get('ANNOUNCEMENT_MODERATOR') || state.accessMap.get('ADMIN') || state.accessMap.get('SUPER_ADMIN')
        }, {
          label: 'Manage Reviews',
          link: './reviews-management',
          index: 4,
          access: state.accessMap.get('REVIEW_MODERATOR') || state.accessMap.get('ADMIN') || state.accessMap.get('SUPER_ADMIN')
        }, {
          label: 'Manage Overviews',
          link: './overviews-management',
          index: 5,
          access: state.accessMap.get('OVERVIEW_MODERATOR') || state.accessMap.get('ADMIN') || state.accessMap.get('SUPER_ADMIN')
        }, {
          label: 'Admin',
          link: './admin',
          index: 6,
          access: state.accessMap.get('ADMIN') || state.accessMap.get('SUPER_ADMIN')
        }
      ];
    });
  }
}
