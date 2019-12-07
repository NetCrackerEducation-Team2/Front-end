import {Genre} from './genre';
import {Author} from './author';

export class Book {
  bookId: number;
  title: string;
  isbn: number;
  release: Date;
  pages: number;
  filePath: string;
  photoPath: string;
  publishingHouse: string;
  rateSum: number;
  votersCount: number;
  creationTime: Date;
  slug: string;
  genres: Genre[];
  authors: Author[];
}
