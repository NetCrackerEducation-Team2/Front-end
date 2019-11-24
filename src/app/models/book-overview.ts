export class BookOverview {
  bookOverviewId: number;
  description: string;
  bookId: number;
  userId: number;
  published: boolean;
  creationTime: Date;
  creatTime: string;

  public constructor(bookOverviewId: number,
                     description: string,
                     bookId: number,
                     published: boolean,
                     creationTime: Date,
                     creatTime: string) {
    this.bookOverviewId = bookOverviewId;
    this.description = description;
    this.bookId = bookId;
    this.published = published;
    this.creationTime = creationTime;
    this.creatTime = creatTime;
  }
}
