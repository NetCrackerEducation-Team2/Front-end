// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  SERVER_DOMAIN: 'http://localhost:8081',
  // SERVER_DOMAIN: 'https://netcracker2-back-end.herokuapp.com',

  /// Чекните, нигде ли я не пропустил кусок URI
  AUTH_LOGIN_URL: '/auth/login',
  AUTH_REGISTER_URL: '/auth/register',
  AUTH_ACTIVATION_URL: '/auth/activate/',
  AUTH_RECOVER_LINK_URL: '/auth/recovery-link/',
  AUTH_RECOVER_PASS_URL: '/auth/recover/',

  API_PROFILE : '/api/profile',
  API_CREATE_ADMIN_MODERATOR: '/admins/create',
  API_DELETE_ADMIN_MODERATOR: '/admins/delete',
  API_GET_ADMIN_MODERATOR: '/admins',
  API_UPDATE_ADMIN_MODERATOR: '/admins/update',

  API_BOOK: '/api/book-by-id/',
  API_BOOKS: '/api/books',
  API_BOOK_OVERVIEW: '/api/book/',
  API_BOOK_OVERVIEWS: '/api/book-overviews/',
  API_BOOK_REVIEW: '/api/book-review',
  API_BOOK_DOWNLOAD: '/api/book/download',
  API_GENRES: '/api/genres',
  API_AUTHORS: '/api/authors',
  API_BOOK_TITLE_BY_ID: '/api/book-title/',
  API_PUBLISHED_BOOK_OVERVIEW: '/api/published-by-book/',
  API_BOOK_OVERVIEWS_BY_BOOK: '/api/book-overviews/by-book/',
  API_ANNOUNCEMENTS: '/api/announcements/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
