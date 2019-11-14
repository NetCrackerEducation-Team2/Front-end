import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from "rxjs";
import {LogService} from "./logging/log.service";
import {Book} from "../models/book";
import {Page} from "../models/page";
import {catchError} from "rxjs/operators";
import {BookFilteringParam} from "../models/book-filtering-param";
import {Author} from "../models/author";
import {Genre} from "../models/genre";
import {StringFormatterService} from "./string-formatter.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly booksUrl: string;
  private readonly bookDownloadUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private stringFormatterService: StringFormatterService,
              private logger: LogService) {
    this.booksUrl = environment.API_BOOKS;
    this.bookDownloadUrl = environment.API_BOOK_DOWNLOAD;
  }

  getBooks(filteringParams: Map<BookFilteringParam, object>, page: number): Observable<Page<Book>>{
    const params = new HttpParams();
    if(filteringParams.get(BookFilteringParam.Title) != null){
      let title = filteringParams.get(BookFilteringParam.Title) as unknown as string;
      params.set('title', title);
    }
    if(filteringParams.get(BookFilteringParam.Author) != null){
      let author = filteringParams.get(BookFilteringParam.Author) as unknown as Author;
      params.set('authorId', author.authorId.toString());
    }
    if(filteringParams.get(BookFilteringParam.Genre) != null){
      let genre = filteringParams.get(BookFilteringParam.Genre) as unknown as Genre;
      params.set('genreId', genre.genreId.toString());
    }
    if(filteringParams.get(BookFilteringParam.AnnouncementDate) != null){
      let announcementDate = filteringParams.get(BookFilteringParam.AnnouncementDate) as unknown as Date;
      params.set('date', announcementDate.toLocaleDateString());
    }
    if(page != null) params.set('page', page.toString());
    return this.http.get<Page<Book>>(this.booksUrl, {params})
      .pipe(
        catchError(this.handleError<any>('getBooks', []))
      );
  }

  getBookSubtitle(book: Book): string{
    let authors = this.getBookAuthorsString(book, 2);
    return "by " + (authors == "" ? "unknown" : authors);
  }

  getBookGenresString(book: Book, count: number): string{
    return this.stringFormatterService.arrayPrettyFormat<Genre>(book.genres, count);
  }

  getBookAuthorsString(book: Book, count: number): string{
    return this.stringFormatterService.arrayPrettyFormat<Author>(book.authors, count);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
