export class BookReview {
  bookReviewId: number;
  description: string;
  bookId: number;
  userId: number;
  creationTime: string;
  published: boolean;

  public constructor(bookReviewId: number,
                     description: string,
                     bookId: number,
                     userId: number,
                     published: boolean,
                     creationTime: string) {
    this.bookReviewId = bookReviewId;
    this.description = description;
    this.bookId = bookId;
    this.published = published;
    this.creationTime = creationTime;
    this.userId = userId;
  }
}
