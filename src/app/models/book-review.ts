export class BookReview {
  bookReviewId: number;
  rating: number;
  description: string;
  bookId: number;
  userId: number;
  creationTime: string;
  published: boolean;

  public constructor(bookReviewId: number,
                     rating: number,
                     description: string,
                     bookId: number,
                     userId: number,
                     published: boolean,
                     creationTime: string) {
    this.bookReviewId = bookReviewId;
    this.rating = rating;
    this.description = description;
    this.bookId = bookId;
    this.published = published;
    this.creationTime = creationTime;
    this.userId = userId;
  }
}
