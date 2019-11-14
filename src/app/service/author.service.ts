import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Author} from "../models/author";
import {AUTHORS} from "../mocks/mock-authors";
import {Genre} from "../models/genre";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  getAuthors(): Observable<Author[]> {
    //Get from mock
    return of(AUTHORS)
  }
}
