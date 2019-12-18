import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../state/app.state';
import * as constants from '../../state/constants';
import {updateRolesState} from '../../state/user';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {
  navLinks: any[];
  activeLinkIndex: number;
  storeSubscription: any;
  routerEventsSubscription: any;

  constructor(private router: Router, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
    }

 private initSubscriptions(): void {

    this.routerEventsSubscription = this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.storeSubscription = this.store.select('user').subscribe(state => {
       updateRolesState(state);
       this.checkNavLinks(state);
    });

  }
private unsubscribeSubscriptions(){
  this.routerEventsSubscription.unsubscribe();
}
private  checkNavLinks(state) {
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
        },
        {
          label: 'Recommendations',
          link: './recommendations',
          index: 2,
          access: state.accessMap.get(constants.user)
        },
        {
          label: 'Profile',
          link: 'profile/' + state.id,
          index: 3,
          access: state.accessMap.get(constants.user)
      }, {
          label: 'Manage Announcements ',
          link: './announcements-management',
          index: 4,
          access: state.accessMap.get(constants.announcementModerator) ||
                  state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }, {
          label: 'Manage Reviews',
          link: './reviews-management',
          index: 5,
          access: state.accessMap.get(constants.reviewModerator) ||
                  state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }, {
          label: 'Manage Books',
          link: './overviews-management',
          index: 6,
          access: state.accessMap.get(constants.overviewModerator) ||
                  state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }, {
          label: 'Admin',
          link: './admin',
          index: 7,
          access: state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }
  ];

  }



}
