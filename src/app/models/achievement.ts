export enum TableName {
  'BOOKS',
   'USERS',
   'BOOK_REVIEWS',
   'BOOK_OVERVIEWS',
   'REVIEW_COMMENTS',
   'MESSAGES',
   'ANNOUNCEMENTS',
   'ACTIVITIES',
   'FRIENDS',
   'ACHIEVEMENTS',
}

export interface Achievement {
  achievementId: number;
  name: string;
  sqlQuery: string;
  tableName: TableName;
  description: string;
}
