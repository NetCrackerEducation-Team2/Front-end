import {Component, Input, OnInit} from '@angular/core';
import {ListItemComponent} from "../presentational/list-item/list-item.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent extends ListItemComponent {

  @Input() photo: Blob;
  @Input() authors: string;
  @Input() genres: string;

  thumbnail: any;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    let objectURL = URL.createObjectURL(this.photo);
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
