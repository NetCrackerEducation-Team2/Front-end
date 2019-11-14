import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Genre} from "../models/genre";
import {GENRES} from "../mocks/mock-genres";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor() { }

  getGenres(): Observable<Genre[]>{
    //Get from mock
    return of(GENRES);
  }
}
