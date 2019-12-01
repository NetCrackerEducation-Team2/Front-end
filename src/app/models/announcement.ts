export class Announcement {
  announcementId: number;
  title: string;
  description: string;
  userId: number;
  published: boolean;
  creationTime: string;
  bookId: number;

  constructor(announcementId: number,
              title: string,
              description: string,
              userId: number,
              published: boolean,
              creationTime: string,
              bookId: number) {
    this.announcementId = announcementId;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.published = published;
    this.creationTime = creationTime;
    this.bookId = bookId;
  }
}
