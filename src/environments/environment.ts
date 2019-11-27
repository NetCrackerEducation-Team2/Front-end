// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {BASE_URL} from './environment.prod';

export const environment = {
  production: false,
  AUTH_LOGIN_URL: 'http://localhost:8081/auth/login',
  AUTH_REGISTER_URL: 'http://localhost:8081/auth/register',
  AUTH_ACTIVATION_URL: 'http://localhost:8081/auth/activate/',
  API_PROFILE: 'http://localhost:8081/profile',
  // AUTH_LOGIN_URL: BASE_URL + '/auth/login',
  // AUTH_REGISTER_URL: BASE_URL + '/auth/register',
  // AUTH_ACTIVATION_URL: BASE_URL + '/auth/activate/',
  // API_PROFILE: BASE_URL + '/profile',
  API_ANNOUNCEMENTS: 'http://localhost:8081/api/announcements/',
  AUTH_RECOVER_LINK_URL: 'http://localhost:8081/auth/recovery-link/',
  AUTH_RECOVER_PASS_URL: 'http://localhost:8081/auth/recover/',
  API_BOOK: 'http://localhost:8081/api/book-by-id/',
  API_BOOKS: 'http://localhost:8081/api/books',
  API_BOOK_INFO: 'http://localhost:8081/api/book',
  API_BOOK_CREATE: BASE_URL + '/api/book',
  API_BOOK_DOWNLOAD: 'http://localhost:8081/api/book/download',
  API_GENRES: 'http://localhost:8081/api/genres/',
  API_GENRES_URL: {
    SEARCH_BY_NAME_SUBSTRING: BASE_URL + '/api/genres/searchByNameContains'
  },
  API_AUTHORS: 'http://localhost:8081/api/authors',
  API_AUTHORS_URL: {
    FIND_URL: BASE_URL + '/api/authors/searchByNameContains'
  },
  API_BOOK_URL: {
    FIND_BY_ID: BASE_URL + '/api/book-by-id/'
  },
  API_REVIEW: BASE_URL + '/api/book-review',
  API_BOOK_TITLE_BY_ID: 'http://localhost:8081/api/book-title/',
  API_PUBLISHED_BOOK_OVERVIEW: 'http://localhost:8081/api/published-by-book/',
  API_BOOK_OVERVIEWS_BY_BOOK: 'http://localhost:8081/api/book-overviews/by-book/',
  API_PUBLISHED_ANNOUNCEMENTS: 'http://localhost:8081/api/announcements/published/',
  API_OVERVIEWS: 'http://localhost:8081/api/book-overviews/',
  API_REVIEWS: 'http://localhost:8081/api/book-review/',
  API_CREATE_ADMIN_MODERATOR: 'http://localhost:8081/admins/create',
  API_DELETE_ADMIN_MODERATOR: 'http://localhost:8081/admins/delete',
  API_GET_ADMIN_MODERATOR: 'http://localhost:8081/admins',
  API_UPDATE_ADMIN_MODERATOR: 'http://localhost:8081/admins/update',

  ADMIN_MODERATOR_PUBLISH_OVERVIEW: 'http://localhost:8081/api/book-overviews/publish/',
  ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS: 'http://localhost:8081/api/announcements/publish/',
  ADMIN_MODERATOR_PUBLISH_REVIEW: 'http://localhost:8081/api/book-review/publish/',

  ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS: 'http://localhost:8081/api/announcements/unpublish/',
  ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW: 'http://localhost:8081/api/book-overviews/unpublish/',
  ADMIN_MODERATOR_UNPUBLISHED_REVIEW: 'http://localhost:8081/api/book-review/unpublish/',

  // API_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/api/announcements/',
  // API_BOOK: 'https://netcracker2-back-end.herokuapp.com/api/book-by-id/',
  // API_BOOKS: 'https://netcracker2-back-end.herokuapp.com/api/books',
  // API_BOOK_TITLE_BY_ID: 'https://netcracker2-back-end.herokuapp.com/api/book-title/',
  // API_PUBLISHED_BOOK_OVERVIEW: 'https://netcracker2-back-end.herokuapp.com/api/published-by-book/',
  // API_BOOK_OVERVIEWS_BY_BOOK: 'https://netcracker2-back-end.herokuapp.com/api/book-overviews/by-book/',
  // API_BOOK_DOWNLOAD: 'https://netcracker2-back-end.herokuapp.com/api/book/download',
  // API_GENRES:  'https://netcracker2-back-end.herokuapp.com/api/genres',
  // API_AUTHORS: 'https://netcracker2-back-end.herokuapp.com/api/authors',
  // API_PROFILE: 'https://netcracker2-back-end.herokuapp.com/profile',
  //
  // AUTH_LOGIN_URL: 'https://netcracker2-back-end.herokuapp.com/auth/login',
  // AUTH_REGISTER_URL: 'https://netcracker2-back-end.herokuapp.com/auth/register',
  // AUTH_ACTIVATION_URL: 'https://netcracker2-back-end.herokuapp.com/auth/activate/',
  // AUTH_RECOVER_LINK_URL: 'https://netcracker2-back-end.herokuapp.com/auth/recovery-link/',
  // AUTH_RECOVER_PASS_URL: 'https://netcracker2-back-end.herokuapp.com/auth/recover/'API_PUBLISH_ANNOUNCEMENTS:

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
