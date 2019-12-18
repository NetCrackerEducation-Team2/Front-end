import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Book} from '../models/book';
import {catchError} from 'rxjs/operators';
import {BookFilteringParam} from '../models/book-filtering-param';
import {StringFormatterService} from './string-formatter.service';
import {Page} from '../models/page';
import {apiUrls} from '../../api-urls';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly bookUrl: string;
  private readonly booksUrl: string;
  private readonly bookTitleByIdUrl: string;
  private readonly bookInfoUrl: string;
  private readonly bookCreateUrl: string;
  private readonly findBookByIdUrl: string;

  constructor(private http: HttpClient,
              private stringFormatterService: StringFormatterService,
              private errorHandlerService: ErrorHandlerService) {
    this.bookUrl = apiUrls.API_BOOK;
    this.booksUrl = apiUrls.API_BOOKS;
    this.bookInfoUrl = apiUrls.API_BOOK_INFO;
    this.bookCreateUrl = apiUrls.API_BOOK_CREATE;
    this.bookTitleByIdUrl = apiUrls.API_BOOK_TITLE_BY_ID;
    this.findBookByIdUrl = apiUrls.API_BOOK_URL.FIND_BY_ID;
  }

  getBooks(filteringParams: Map<BookFilteringParam, any>, page: number, pageSize: number): Observable<Page<Book>> {
    let params = new HttpParams();
    let paramsString = '';
    if (filteringParams.get(BookFilteringParam.Title) != null) {
      const title = filteringParams.get(BookFilteringParam.Title);
      params = params.set('title', title);
    }
    if (filteringParams.get(BookFilteringParam.Author) != null) {
      const author = filteringParams.get(BookFilteringParam.Author);
      params = params.set('authorId', author.authorId.toString());
    }
    if (filteringParams.get(BookFilteringParam.Genre) != null) {
      const genre = filteringParams.get(BookFilteringParam.Genre);
      params = params.set('genreId', genre.genreId.toString());
    }
    if (filteringParams.get(BookFilteringParam.AnnouncementDate) != null) {
      const announcementDate = filteringParams.get(BookFilteringParam.AnnouncementDate);
      params = params.set('date', this.stringFormatterService.formatDate(announcementDate));
    }
    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (pageSize != null) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    return this.http.get(this.booksUrl + paramsString)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('getBooks', []))
      );
  }

  getBookBySlug(slug: string): Observable<Book> {
    return this.http.get(this.bookInfoUrl + '/' + slug)
      .pipe(catchError(this.errorHandlerService.handleError<any>('getBookBySlug', [])));
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get(this.findBookByIdUrl + id)
      .pipe(catchError(this.errorHandlerService.handleError<any>('getBookById', [])));
  }

  suggestBook(book) {
    return this.http.post(this.bookCreateUrl, book)
      .pipe(
        catchError(this.errorHandlerService.handleError<any>('Suggest book', null))
      );
  }
}
