import {Component, OnInit, Input} from '@angular/core';
import {Author} from "../../models/author";
import {Genre} from "../../models/genre";
import {GenreService} from "../../service/genre.service";
import {AuthorService} from "../../service/author.service";
import {BookFilteringParam} from "../../models/book-filtering-param";
import {Book} from "../../models/book";
import {Page} from "../../models/page";
import {BookService} from "../../service/book.service";
import {PageEvent} from "@angular/material";

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
  selectedPage: Page<Book>;
  window: any;

  constructor(private genreService: GenreService,
              private authorService: AuthorService,
              private bookService: BookService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
    this.authorService.getAuthors().subscribe(authors => this.authors = authors);
    this.selectedPage = new Page<Book>();
    this.selectedPage.currentPage = 1;
    this.selectedPage.pageSize = 5;
    this.selectedPage.countPages = 10;
    this.window = window;
    //let filteringParams = this.getBookFilteringParamsMap();
    //this.bookService.getBooks(filteringParams, this.selectedPage.currentPage, this.selectedPage.pageSize).subscribe(selectedPage => this.selectedPage = selectedPage);
  }

  search(): void{
    //let filteringParams = this.getBookFilteringParamsMap();
    //this.bookService.getBooks(filteringParams, this.selectedPage.currentPage, this.selectedPage.pageSize).subscribe(selectedPage => this.selectedPage = selectedPage);
  }

  handlePage(event?: PageEvent) {
    this.selectedPage.currentPage = event.pageIndex;
    console.log("Current selectedPage: " + this.selectedPage.currentPage);
    this.selectedPage.pageSize = event.pageSize;
    console.log("Page size: " + this.selectedPage.pageSize);
    this.search();
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
