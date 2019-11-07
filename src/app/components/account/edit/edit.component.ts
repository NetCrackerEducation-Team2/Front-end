import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isUpdated: boolean;

  user = {
    fullName: 'Alexander Pushkin',
    email: 'alexanderpushkin1799@mail.rus',
    login: 'dantess',
    optionArr: [
      {title: 'Book adding', subscribed: false},
      {title: 'End of reading', subscribed: false},
      {title: 'My achievements', subscribed: true},
      {title: 'My reviews', subscribed: false},
      {title: 'Add to favourite', subscribed: true}
    ],

  };

  constructor(private router: Router) {
    this.isUpdated = false;
  }

  ngOnInit() {
  }

  save() {
    console.log('saving changes...');
    this.router.navigate(['/profile']);
  }
}
