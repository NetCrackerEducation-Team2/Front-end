import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ListItemComponent} from '../presentational/list-item/list-item.component';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent extends ListItemComponent implements OnInit {

  @Input() photo: string;
  @Input() authors: string;
  @Input() genres: string;

  photoSource: SafeUrl;
  bookSlug: string;
  bookId: number;

  constructor(private sanitizer: DomSanitizer, private bookService: BookService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    /*this.route.params.pipe(map(p => p.slug, switchMap(slug => this.getBookInfo(slug)))).subscribe(book => {
      console.log('Get book info by slug: ', book);
      this.bookId = book.bookId;
    });*/
    this.route.params.subscribe(params => {
      const slug = params.id;
      this.getBookInfo(slug).subscribe(book => {
        console.log('Get book info by slug: ', book);
        this.bookId = book.bookId;
      });
    });
    this.photoSource = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.photo);
  }

  getBookInfo(slug) {
    return this.bookService.getBookBySlug(slug);
  }
}
