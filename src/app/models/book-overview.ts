import {Book} from './book';
import {User} from './user';

export class BookOverview {
  bookOverviewId: number;
  description: string;
  bookId: number;
  book: Book;
  userId: number;
  user: User;
  published: boolean;
  creationTime: string;
}
