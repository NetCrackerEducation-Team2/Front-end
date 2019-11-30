import {User} from './user';

export class BookReviewComment {
  commentId: number;
  authorId: number;
  bookReviewId: number;
  content: string;
  creationTime: Date;
  author: User;
}
