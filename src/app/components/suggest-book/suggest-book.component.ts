import {Component, OnInit} from '@angular/core';
import {AuthorService} from '../../service/author.service';
import {GenreService} from '../../service/genre.service';
import {BookService} from '../../service/book.service';
import {Book} from '../../models/book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-suggest-book',
  templateUrl: './suggest-book.component.html',
  styleUrls: ['./suggest-book.component.css']
})
export class SuggestBookComponent implements OnInit {
  authors = [];
  genres = [];
  book = {title: '', authors: [], genres: [], description: '', publishYear: null, release: null, isbn: null, publishingHouse: null};

  constructor(private authorService: AuthorService,
              private genreService: GenreService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadAuthors();
    this.loadGenres();
  }

  submit() {
    console.log('Suggesting book: ', this.book);
    this.bookService.suggestBook(this.book).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe(genres => {
      console.log('Loaded genres: ', genres);
      this.genres = genres;
    });
  }

  private loadAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => {
      console.log('Loaded authors: ', authors);
      this.authors = authors;
    });
  }
}
