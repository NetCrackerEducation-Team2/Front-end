import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../../models/author';
import {Genre} from '../../models/genre';
import {GenreService} from '../../service/genre.service';
import {AuthorService} from '../../service/author.service';
import {BookFilteringParam} from '../../models/book-filtering-param';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';
import {MatAutocompleteSelectedEvent, PageEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

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

  authorsControl = new FormControl();
  genresControl = new FormControl();
  authors: Author[] = [];
  genres: Genre[] = [];
  filteredAuthors: Observable<Author[]>;
  filteredGenres: Observable<Genre[]>;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo>;
  pageLoading: boolean;
  window: Window = window;

  constructor(private genreService: GenreService,
              private authorService: AuthorService,
              private bookPresentationService: BookPresentationService,
              public bookService: BookService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
      this.genres.sort((g1, g2) => g1.name.localeCompare(g2.name));
      this.genres.push(null);
    });
    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.authors.sort((a1, a2) => a1.fullName.localeCompare(a2.fullName));
      this.authors.push(null);
    });
    this.filteredGenres = this.genresControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? (typeof value === 'string' ? value : value.name)  : ''),
        map(name => name ? this.filterGenres(name) : this.genres.slice())
      );
    this.filteredAuthors = this.authorsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? (typeof value === 'string' ? value : value.name)  : ''),
        map(fullName => fullName ? this.filterAuthors(fullName) : this.authors.slice())
      );
    this.search();
  }

  searchWithAuthor(event?: MatAutocompleteSelectedEvent): void {
    this.author = event.option.value;
    this.search();
  }

  searchWithGenre(event?: MatAutocompleteSelectedEvent): void {
    this.genre = event.option.value;
    this.search();
  }

  search(): void {
    this.resetPaginator();
    this.searchPage();
  }

  searchPage(): void {
    this.pageLoading = true;
    const filteringParams = this.getBookFilteringParamsMap();
    this.bookService.getBooks(filteringParams, this.selectedPage.currentPage, this.selectedPage.pageSize)
      .pipe(map(page => {
        return {
          currentPage: page.currentPage,
          countPages: page.countPages,
          pageSize: page.pageSize,
          array: page.array.map(book => {
              return {
                title: book.title,
                subtitle: this.bookPresentationService.getBookSubtitle(book),
                photo: this.bookPresentationService.getBookPhoto(book),
                itemId: null,
                publish: null,
                contentElements: [
                  {contentInfoId: 1, title: 'Genres:', content: this.bookPresentationService.getBookGenresString(book, 3)},
                  {contentInfoId: 2, title: 'Authors:', content: this.bookPresentationService.getBookAuthorsString(book, 3)}
                ],
                actionElements: [
                  {buttonInfoId: 1, name: 'View', url: book.slug, disabled: false, clickFunction: () => {}},
                  {buttonInfoId: 2, name: 'View Overviews', url: 'book-overviews/' + book.bookId,
                    disabled: false, clickFunction: () => {}}
                ],
                listItemCallback: null,
                additionalParams: null
              };
          })
        };
      }))
      .subscribe(selectedPage => {
        this.selectedPage = selectedPage;
        this.pageLoading = false;
      });
  }

  handlePage(event?: PageEvent): void {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private getBookFilteringParamsMap(): Map<BookFilteringParam, object> {
    const filteringParams = new Map<BookFilteringParam, object>();
    filteringParams.set(BookFilteringParam.Title, this.title as any as object);
    filteringParams.set(BookFilteringParam.Author, this.author);
    filteringParams.set(BookFilteringParam.Genre, this.genre);
    filteringParams.set(BookFilteringParam.AnnouncementDate, this.announcementDate);
    return filteringParams;
  }

  private resetPaginator(): void {
    this.selectedPage = this.emptyPage;
  }

  private filterAuthors(fullName: string): Author[] {
    const filterValue = fullName.toLowerCase();
    return this.authors.filter(author => !author || author.fullName.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterGenres(name: string): Genre[] {
    const filterValue = name.toLowerCase();
    return this.genres.filter(genre => !genre || genre.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayAuthor(author: Author): string {
    return author ? author.fullName : null;
  }

  displayGenre(genre: Genre): string {
    return genre ? genre.name : null;
  }
}
