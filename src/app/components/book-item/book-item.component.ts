import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ListItemComponent} from '../presentational/list-item/list-item.component';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent extends ListItemComponent {

  @Input() photo: string;
  @Input() authors: string;
  @Input() genres: string;
  @Input() overviewsUrl: string;
  @Input() overviewsBtnText: string;
  @Input() overviewsItemCallback: Function;

  photoSource: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.photoSource = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.photo);
  }

  //Will refer to role service in future
  isModerator(): boolean{
    return true;
  }

}
