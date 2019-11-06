import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  myName;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  save() {
    console.log('saving changes...');
    this.router.navigate(['/profile']);
  }
}
