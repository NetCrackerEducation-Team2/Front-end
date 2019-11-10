export class Announcement {
  announcement_id: number;
  title: string;
  description: string;
  user_id: number;
  published: boolean;
  creation_time: string;
  book_id: number;
  
  public constructor(announcement_id: number,
              title: string,
              description: string,
              user_id: number,
              published: boolean,
              creation_time: string,
              book_id: number) {
        this.announcement_id = announcement_id;
        this.title = title;
        this.description = description;
        this.user_id = user_id;
        this.published = published;
        this.creation_time = creation_time;
        this.book_id = book_id;
   }
}
