import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Author} from '../../models/author';
import {Genre} from '../../models/genre';
import {FormControl} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {Page} from '../../models/page';
import {ListItemInfo} from '../../models/presentation-models/list-item-info';
import {SearchingHistoryService} from '../../service/searching-history.service';
import {GenreService} from '../../service/genre.service';
import {AuthorService} from '../../service/author.service';
import {BookPresentationService} from '../../service/presentation-services/book-presentation.service';
import {AccountService} from '../../service/account.service';
import {BookService} from '../../service/book.service';
import {debounceTime, exhaustMap, filter, flatMap, map, scan, startWith, switchMap, tap} from 'rxjs/operators';
import {takeWhileInclusive} from 'rxjs-take-while-inclusive';
import {MatAutocompleteSelectedEvent, PageEvent} from '@angular/material';
import {UserBookFilteringParam} from '../../models/user-book-filtering-param';
import {UsersBooksService} from '../../service/users-books-service';
import {Book} from '../../models/book';
import {UserBook} from '../../models/users-book';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../state/app.state';
import {UserState} from '../../state/user';

@Component({
  selector: 'app-search-user-books',
  templateUrl: './search-user-books.component.html',
  styleUrls: ['./search-user-books.component.css']
})
export class SearchUserBooksComponent implements OnInit, OnDestroy {
  loggedUserId: number;
  isLoggedSubscription: Subscription;

  @Input() title: string = null;
  @Input() author: Author = null;
  @Input() genre: Genre = null;
  @Input() announcementDate: Date = null;
  @Input() readMark: boolean = null;
  @Input() favoriteMark: boolean = null;

  authorsControl = new FormControl();
  genresControl = new FormControl();
  filteredAuthors$: Observable<Author[]>;
  filteredGenres$: Observable<Genre[]>;
  selectedPage: Page<ListItemInfo>;
  pageLoading: boolean;
  window: Window = window;
  private nextAuthorPage$ = new Subject();
  private nextGenrePage$ = new Subject();

  usersBooks: UserBook[];
  books: Book[];

  constructor(private searchingHistoryService: SearchingHistoryService,
              private genreService: GenreService,
              private authorService: AuthorService,
              private bookPresentationService: BookPresentationService,
              private accountService: AccountService,
              private bookService: BookService,
              private usersBooksService: UsersBooksService,
              private route: ActivatedRoute,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.usersBooks = [];
    this.books = [];
    this.selectedPage = {currentPage: 0, pageSize: 5, countPages: 0, array: []};

    this.filteredGenres$ = this.genresControl.valueChanges
      .pipe(startWith(''),
        debounceTime(200),
        filter(q => typeof q === 'string'))
      .pipe(switchMap(filtering => {
        let currentPage = 0;
        return this.nextGenrePage$.pipe(
          startWith(currentPage),
          exhaustMap(_ => this.genreService.searchPartGenres(filtering, currentPage)),
          tap(() => currentPage++),
          takeWhileInclusive(g => g.length > 0),
          scan((allGenres, newGenres) => allGenres.concat(newGenres), []),
        );
      }));

    this.filteredAuthors$ = this.authorsControl.valueChanges
      .pipe(startWith(''),
        debounceTime(200),
        filter(q => typeof q === 'string'))
      .pipe(switchMap(filtering => {
        let currentPage = 0;
        return this.nextAuthorPage$.pipe(
          startWith(currentPage),
          exhaustMap(_ => this.authorService.findPartAuthors(filtering, currentPage)),
          tap(() => currentPage++),
          takeWhileInclusive(a => a.length > 0),
          scan((allAuthors, newAuthors) => allAuthors.concat(newAuthors), []),
        );
      }));

    this.search();
  }

  ngOnDestroy(): void {
    if (this.isLoggedSubscription) {
      this.isLoggedSubscription.unsubscribe();
    }
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
    if (this.readMark === false) {
      this.readMark = null;
    }
    if (this.favoriteMark === false) {
      this.favoriteMark = null;
    }
    this.resetPaginator();
    this.searchPage();
  }

  searchPage(): void {
    this.usersBooks = [];
    this.books = [];
    this.selectedPage.array = [];

    this.pageLoading = true;
    this.isLoggedSubscription = this.store.select('user').pipe(
      flatMap((reducer: UserState) => {
        this.loggedUserId = reducer.id;
        const filteringParams = this.getUserBookFilteringParamsMap();
        return this.usersBooksService.getFilteredUserBook(filteringParams, this.selectedPage.currentPage, this.selectedPage.pageSize);
      }),
      map((page: Page<UserBook>) => {
        this.selectedPage.currentPage = page.currentPage;
        this.selectedPage.countPages = page.countPages;
        this.selectedPage.pageSize = page.pageSize;
        this.pageLoading = false;
        return page.array;
      }),
      flatMap((userBook: UserBook[]) => {
        return userBook;
      }),
      flatMap((userBook: UserBook) => {
        this.usersBooks.push(userBook);
        return this.bookService.getBookById(userBook.bookId);
      })
    ).subscribe((book: Book) => {
      this.books.push(book);
      const usersBook = this.usersBooks.filter(value => value.bookId === book.bookId)[0];
      const res: ListItemInfo = this.makeListItemFromBook(book, usersBook);
      this.selectedPage.array.push(res);
    });
  }

  handlePage(event?: PageEvent): void {
    this.selectedPage.currentPage = event.pageIndex;
    this.selectedPage.pageSize = event.pageSize;
    this.searchPage();
  }

  private resetPaginator(): void {
    this.selectedPage = {currentPage: 0, pageSize: 5, countPages: 0, array: []};
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

  private getUserBookFilteringParamsMap(): Map<UserBookFilteringParam, any> {
    const filteringParams = new Map<UserBookFilteringParam, any>();
    filteringParams.set(UserBookFilteringParam.UserId, this.loggedUserId);

    filteringParams.set(UserBookFilteringParam.Title, this.title);
    filteringParams.set(UserBookFilteringParam.Author, this.author);
    filteringParams.set(UserBookFilteringParam.Genre, this.genre);
    filteringParams.set(UserBookFilteringParam.AnnouncementDate, this.announcementDate);

    if (this.readMark) {
      filteringParams.set(UserBookFilteringParam.DontSearchByReadMark, false);
      filteringParams.set(UserBookFilteringParam.ReadMark, this.readMark);
    } else {
      filteringParams.set(UserBookFilteringParam.DontSearchByReadMark, true);
      filteringParams.set(UserBookFilteringParam.ReadMark, this.readMark);
    }

    if (this.favoriteMark) {
      filteringParams.set(UserBookFilteringParam.DontSearchByFavoriteMark, false);
      filteringParams.set(UserBookFilteringParam.FavoriteMark, this.favoriteMark);
    } else {
      filteringParams.set(UserBookFilteringParam.DontSearchByFavoriteMark, true);
      filteringParams.set(UserBookFilteringParam.FavoriteMark, this.favoriteMark);
    }
    return filteringParams;
  }

  makeListItemFromBook(book: Book, userBook: UserBook): ListItemInfo {
    const item: ListItemInfo = {
      title: book.title,
      subtitle: this.bookPresentationService.getBookSubtitle(book),
      photoPath: book.photoPath,
      publish: null,
      contentElements: [
        {contentInfoId: 1, title: 'Genres:', content: this.bookPresentationService.getBookGenresString(book, 3)},
        {contentInfoId: 2, title: 'Authors:', content: this.bookPresentationService.getBookAuthorsString(book, 3)}
      ],
      actionElements: [
        {buttonInfoId: 0, name: 'View', url: '/book-overview/' + book.slug, disabled: false, clickFunction: () => {}},
      ],
      listItemCallback: null,
      additionalParams: null
    };

    if (userBook.favoriteMark) {
      item.actionElements.push(
        {buttonInfoId: 1, name: 'Remove from Favorite', url: '/personal-list', disabled: false, clickFunction:
            () => { this.makeFavoriteMark(item, userBook.userBookId, false); }}
      );
    } else {
      item.actionElements.push(
        {buttonInfoId: 1, name: 'Add to Favorite', url: '/personal-list', disabled: false, clickFunction:
            () => { this.makeFavoriteMark(item, userBook.userBookId, true); }}
      );
    }
    if (userBook.readMark) {
      item.actionElements.push(
        {buttonInfoId: 2, name: 'Remove read mark', url: '/personal-list', disabled: false, clickFunction:
            () => { this.makeReadMark(item, userBook.userBookId, false); }}
      );
    } else {
      item.actionElements.push(
        {buttonInfoId: 2, name: 'Set read mark', url: '/personal-list', disabled: false, clickFunction:
            () => { this.makeReadMark(item, userBook.userBookId, true); }}
      );
    }

    item.actionElements.push(
      {buttonInfoId: 3, name: 'Remove book', url: '/personal-list', disabled: false, clickFunction:
          () => { this.removeFromList(userBook.userBookId); }}
    );

    return item;
  }
  makeFavoriteMark(item: ListItemInfo, userBookId: number, value: boolean): void {
    this.usersBooksService.setFavoriteMark(userBookId, value)
      .subscribe((userBook: UserBook) => {
        this.searchPage();
      });
  }
  makeReadMark(item: ListItemInfo, userBookId: number, value: boolean): void {
    this.usersBooksService.setReadMark(userBookId, value)
      .subscribe((userBook: UserBook) => {
        this.searchPage();
      });
  }
  removeFromList(userBookId: number): void {
    this.usersBooksService.deleteUsersBook(userBookId)
      .subscribe(() => {
        this.searchPage();
      });
  }
}
