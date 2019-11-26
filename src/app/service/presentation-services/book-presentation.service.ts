import {EventEmitter, Injectable} from '@angular/core';
import {Book} from '../../models/book';
import {ButtonInfo} from '../../models/presentation-models/button-info';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {StringFormatterService} from '../string-formatter.service';

@Injectable({
  providedIn: 'root'
})
export class BookPresentationService {

  constructor(private sanitizer: DomSanitizer,
              private stringFormatterService: StringFormatterService) {}

  getBookPhoto(book: Book): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + book.photo);
  }

  getBookSubtitle(book: Book): string{
    let authors = this.getBookAuthorsString(book, 1);
    return "by " + (authors == "" ? "unknown" : authors);
  }

  getBookGenresString(book: Book, count: number): string{
    return this.stringFormatterService.arrayPrettyFormat(book.genres.map(genre => genre.name), count);
  }

  getBookAuthorsString(book: Book, count: number): string{
    return this.stringFormatterService.arrayPrettyFormat(book.authors.map(author => author.fullName), count);
  }
}
