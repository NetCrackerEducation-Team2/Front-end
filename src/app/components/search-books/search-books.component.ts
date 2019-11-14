import {Output, EventEmitter, Component, OnInit, Input} from '@angular/core';
import {Author} from "../../models/author";
import {Genre} from "../../models/genre";
import {GenreService} from "../../service/genre.service";
import {AuthorService} from "../../service/author.service";
import {BookFilteringParam} from "../../models/book-filtering-param";
import {Book} from "../../models/book";
import {Page} from "../../models/page";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  @Input() title: string = null;
  @Input() author: Author = null;
  @Input() genre: Genre = null;
  @Input() announcementDate: Date = null;

  authors: Author[];
  genres: Genre[];
  page: Page<Book>;

  constructor(private genreService: GenreService,
              private authorService: AuthorService,
              private bookService: BookService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
    this.authorService.getAuthors().subscribe(authors => this.authors = authors);
    //let filteringParams = this.getBookFilteringParamsMap();
    //this.bookService.getBooks(filteringParams, 1).subscribe(page => this.page = page);
  }

  search(): void{
    //let filteringParams = this.getBookFilteringParamsMap();
    //this.bookService.getBooks(filteringParams, this.page.currentPage).subscribe(page => this.page = page);
  }

  getBookFilteringParamsMap(): Map<BookFilteringParam, object>{
    let filteringParams = new Map<BookFilteringParam, object>();
    filteringParams.set(BookFilteringParam.Title, this.title as any as object);
    filteringParams.set(BookFilteringParam.Author, this.author);
    filteringParams.set(BookFilteringParam.Genre, this.genre);
    filteringParams.set(BookFilteringParam.AnnouncementDate, this.announcementDate);
    return filteringParams;
  }

}
