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
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Library',
            link: './',
            index: 0
        }, {
            label: 'Announcements',
            link: './404',
            index: 1
        }
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
});
}

  }
