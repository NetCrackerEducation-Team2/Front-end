import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-item',
  templateUrl: './announcement-item.component.html',
  styleUrls: ['./announcement-item.component.css']
})
export class AnnouncementItemComponent implements OnInit {
  title = "Shiba Inu 2";
  desc = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.";

  constructor() { }

  ngOnInit() {
  }

}
