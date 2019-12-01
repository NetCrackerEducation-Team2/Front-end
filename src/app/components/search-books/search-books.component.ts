import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../../models/author';
import {Genre} from '../../models/genre';
import {GenreService} from '../../service/genre.service';
import {AuthorService} from '../../service/author.service';
import {BookFilteringParam} from '../../models/book-filtering-param';
import {Page} from '../../models/page';
import {BookService} from '../../service/book.service';
import {MatAutocompleteSelectedEvent, PageEvent} from '@angular/material';
import {debounceTime, exhaustMap, filter, map, scan, startWith, switchMap, tap} from 'rxjs/operators';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {SearchingHistoryService} from '../../service/searching-history.service';
import {AccountService} from '../../service/account.service';
import {takeWhileInclusive} from 'rxjs-take-while-inclusive';

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
  filteredAuthors$: Observable<Author[]>;
  filteredGenres$: Observable<Genre[]>;
  emptyPage: Page<ListItemInfo> = {currentPage: 0, pageSize: 5, countPages: 0, array: null};
  selectedPage: Page<ListItemInfo>;
  pageLoading: boolean;
  window: Window = window;
  private nextAuthorPage$ = new Subject();
  private nextGenrePage$ = new Subject();

  constructor(private searchingHistoryService: SearchingHistoryService,
              private genreService: GenreService,
              private authorService: AuthorService,
              private bookPresentationService: BookPresentationService,
              private accountService: AccountService,
              public bookService: BookService) {
  }

  ngOnInit() {
    this.filteredGenres$ = this.genresControl.valueChanges
      .pipe(startWith(''),
      debounceTime(200),
      filter(q => typeof q === 'string'))
      .pipe(switchMap(filter => {
        let currentPage = 0;
        return this.nextGenrePage$.pipe(
          startWith(currentPage),
          exhaustMap(_ => this.genreService.searchPartGenres(filter, currentPage)),
          tap(() => currentPage++),
          takeWhileInclusive(g => g.length > 0),
          scan((allGenres, newGenres) => allGenres.concat(newGenres), []),
        );
      }));

    this.filteredAuthors$ = this.authorsControl.valueChanges
      .pipe(startWith(''),
      debounceTime(200),
      filter(q => typeof q === 'string'))
      .pipe(switchMap(filter => {
        let currentPage = 0;
        return this.nextAuthorPage$.pipe(
          startWith(currentPage),
          exhaustMap(_ => this.authorService.findPartAuthors(filter, currentPage)),
          tap(() => currentPage++),
          takeWhileInclusive(a => a.length > 0),
          scan((allAuthors, newAuthors) => allAuthors.concat(newAuthors), []),
        );
      }));

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
    this.bookService.getBooks(filteringParams, this.selectedPage.currentPage, this.selectedPage.pageSize).pipe(
      switchMap(page => this.searchingHistoryService.addSearchingHistories(
        this.accountService.getCurrentUser(), this.getBookFilteringParamsMap(), page.array)
        .pipe(map(res => ({res, page}))
        )))
      .subscribe(({res, page}) => {
        this.selectedPage = {
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
                {
                  buttonInfoId: 1, name: 'View', url: '/book-overview/' + book.slug, disabled: false, clickFunction: () => {
                  }
                },
                {
                  buttonInfoId: 2, name: 'View Overviews', url: 'book-overviews/' + book.bookId,
                  disabled: false, clickFunction: () => {
                  }
                }
              ],
              listItemCallback: null,
              additionalParams: null
            };
          })
        };
        this.pageLoading = false;
      });
  }

  handlePage(event?: PageEvent): void {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private getBookFilteringParamsMap(): Map<BookFilteringParam, any> {
    const filteringParams = new Map<BookFilteringParam, any>();
    filteringParams.set(BookFilteringParam.Title, this.title);
    filteringParams.set(BookFilteringParam.Author, this.author);
    filteringParams.set(BookFilteringParam.Genre, this.genre);
    filteringParams.set(BookFilteringParam.AnnouncementDate, this.announcementDate);
    return filteringParams;
  }

  private resetPaginator(): void {
    this.selectedPage = this.emptyPage;
  }

  onAuthorScroll() {
    this.nextAuthorPage$.next();
  }

  onGenreScroll() {
    this.nextGenrePage$.next();
  }

  displayAuthor(author: Author): string {
    return author ? author.fullName : null;
  }

  displayGenre(genre: Genre): string {
    return genre ? genre.name : null;
  }
}
