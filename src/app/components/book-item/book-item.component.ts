import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ListItemComponent} from '../presentational/list-item/list-item.component';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent extends ListItemComponent implements OnInit {

  @Input() photo: string;
  @Input() authors: string;
  @Input() genres: string;
  @Input() overviewsUrl: string;
  @Input() overviewsBtnText: string;
  @Input() overviewsItemCallback: Function;

  photoSource: SafeUrl;
  bookSlug: string;
  bookId: number;

  constructor(private sanitizer: DomSanitizer,
              private bookService: BookService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (slug) {
      this.getBookInfo(slug).subscribe(book => {
        this.bookId = book.bookId;
      });
    } else {
      this.bookService.getBookById(id).subscribe(book => {
        this.bookId = book.bookId;
      });
    }
    this.photoSource = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.photo);
  }

  getBookInfo(slug) {
    return this.bookService.getBookBySlug(slug);
  }

  // Will refer to role service in future
  isModerator(): boolean {
    return true;
  }
}
