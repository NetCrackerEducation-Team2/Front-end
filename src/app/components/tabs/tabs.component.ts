import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {AppState} from '../../state/app.state';
import * as constants from '../../state/constants';
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
  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();

  }

 private initSubscriptions(): void {

    this.routerEventsSubscription = this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.storeSubscription = this.store.select('appReducer').subscribe(state => {
       this.updateRolesState(state);
       this.checkNavLinks(state);
    });

  }


 private updateRolesState(state) {

    for (const role of state.roles) {
      this.accessMapChange(state, role);
    }
    if (state.roles.length < 1) {
     state.accessMap.set(constants.admin, false);
     state.accessMap.set(constants.superAdmin, false);
     state.accessMap.set(constants.overviewModerator, false);
     state.accessMap.set(constants.reviewModerator, false);
     state.accessMap.set(constants.announcementModerator, false);
    }
    state.accessMap.set(constants.user, state.login);

  }

private  accessMapChange(state, role) {
    switch (role) {
      case constants.admin:
        state.accessMap.set(constants.admin, true);
        break;
      case constants.superAdmin:
        state.accessMap.set(constants.superAdmin, true);
        break;
      case constants.overviewModerator:
        state.accessMap.set(constants.overviewModerator, true);
        break;
      case constants.reviewModerator:
        state.accessMap.set(constants.reviewModerator, true);
        break;
      case constants.announcementModerator:
        state.accessMap.set(constants.announcementModerator, true);
        break;
    }

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
      }, {
          label: 'Profile',
          link: 'profile/' + state.id,
          index: 2,
          access: state.accessMap.get(constants.user)
      }, {
          label: 'Manage Announcements ',
          link: './announcements-management',
          index: 3,
          access: state.accessMap.get(constants.announcementModerator) ||
                  state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }, {
          label: 'Manage Reviews',
          link: './reviews-management',
          index: 4,
          access: state.accessMap.get(constants.reviewModerator) ||
                  state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }, {
          label: 'Manage Books',
          link: './overviews-management',
          index: 5,
          access: state.accessMap.get(constants.overviewModerator) ||
                  state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }, {
          label: 'Admin',
          link: './admin',
          index: 6,
          access: state.accessMap.get(constants.admin) ||
                  state.accessMap.get(constants.superAdmin)
      }
  ];

  }



}
