import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Book} from '../models/book';
import {catchError} from 'rxjs/operators';
import {BookFilteringParam} from '../models/book-filtering-param';
import {Author} from '../models/author';
import {Genre} from '../models/genre';
import {StringFormatterService} from './string-formatter.service';
import {Page} from '../models/page';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly bookUrl: string;
  private readonly booksUrl: string;
  private readonly bookTitleByIdUrl: string;
  private readonly bookDownloadUrl: string;
  private readonly bookInfoUrl: string;
  private readonly bookCreateUrl: string;
  private readonly findBookByIdUrl: string;

  constructor(private http: HttpClient,
              private stringFormatterService: StringFormatterService,
              private errorHandlerService: ErrorHandlerService) {
    this.bookUrl = environment.API_BOOK;
    this.booksUrl = environment.API_BOOKS;
    this.bookInfoUrl = environment.API_BOOK_INFO;
    this.bookCreateUrl = environment.API_BOOK_CREATE;
    this.bookDownloadUrl = environment.API_BOOK_DOWNLOAD;
    this.bookTitleByIdUrl = environment.API_BOOK_TITLE_BY_ID;
    this.bookDownloadUrl = environment.API_BOOK_DOWNLOAD;
    this.findBookByIdUrl = environment.API_BOOK_URL.FIND_BY_ID;
  }

  getBooks(filteringParams: Map<BookFilteringParam, object>, page: number, pageSize: number): Observable<Page<Book>> {
    let params = new HttpParams();
    const title = filteringParams.get(BookFilteringParam.Title) as unknown as string;
    const author = filteringParams.get(BookFilteringParam.Author) as unknown as Author;
    const genre = filteringParams.get(BookFilteringParam.Genre) as unknown as Genre;
    const announcementDate = filteringParams.get(BookFilteringParam.AnnouncementDate) as unknown as Date;
    if (filteringParams.get(BookFilteringParam.Title)) params = params.set('title', title);
    if (filteringParams.get(BookFilteringParam.Author)) params = params.set('authorId', author.authorId.toString());
    if (filteringParams.get(BookFilteringParam.Genre)) params = params.set('genreId', genre.genreId.toString());
    if (filteringParams.get(BookFilteringParam.AnnouncementDate)) params = params.set('date', this.stringFormatterService.formatDate(announcementDate));
    params = params.set('page', page.toString()).set('pageSize', pageSize.toString());
    let paramsString = '?' + params.toString();
    return this.http.get(this.booksUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getBooks', []))
      );
  }

  getBookBySlug(slug: string): Observable<Book> {
    return this.http.get(this.bookInfoUrl + '/' + slug)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getBookBySlug', []))
      );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get(this.findBookByIdUrl + id)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getBookById', []))
      );
  }

  suggestBook(book) {
    return this.http.post(this.bookCreateUrl, book)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('suggestBook', []))
      );
  }
}
