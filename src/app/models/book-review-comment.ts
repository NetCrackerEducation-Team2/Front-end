import {User} from './user';

export class BookReviewComment {
  commentId: number;
  userId: number;
  bookReviewId: number;
  content: string;
  creationTime: Date;
  author: User;
}
