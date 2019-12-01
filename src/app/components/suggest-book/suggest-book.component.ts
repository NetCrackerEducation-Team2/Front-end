import {Component, OnInit} from '@angular/core';
import {AuthorService} from '../../service/author.service';
import {GenreService} from '../../service/genre.service';
import {BookService} from '../../service/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-suggest-book',
  templateUrl: './suggest-book.component.html',
  styleUrls: ['./suggest-book.component.css']
})
export class SuggestBookComponent implements OnInit {
  authors = [];
  genres = [];
  book = {
    title: '',
    authors: [],
    genres: [],
    description: '',
    publishYear: null,
    release: null,
    isbn: null,
    publishingHouse: null
  };

  constructor(private authorService: AuthorService,
              private genreService: GenreService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.bookService.suggestBook(this.book).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  searchGenres(event) {
    this.genreService.searchGenres(event.term).subscribe(genres => {
      this.genres = genres;
    });
  }
  searchAuthors(event) {
    this.authorService.findAuthors(event.term).subscribe(authors => {
      this.authors = authors;
    });
  }
}
