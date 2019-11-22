import {User} from './user';

export class BookReview {
  bookReviewId: number;
  rating: number;
  description: string;
  userId: number;
  bookId: number;
  published: boolean;
  creationTime: Date;
  author: User;
}
