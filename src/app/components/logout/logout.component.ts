import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<p>Redirecting to home page...</p>',
  styles: ['']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
