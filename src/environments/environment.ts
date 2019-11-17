// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH_LOGIN_URL: 'http://localhost:8081/auth/login',
  AUTH_REGISTER_URL: 'http://localhost:8081/auth/register',
  AUTH_ACTIVATION_URL: 'http://localhost:8081/auth/activate/',
  API_PROFILE : 'http://localhost:8081/profile',
  API_BOOKS: 'http://localhost:8081/api/books',
  API_BOOK: 'http://localhost:8081/api/book',
  API_BOOK_DOWNLOAD: 'http://localhost:8081/api/book/download',
  API_GENRES: 'http://localhost:8081/api/genres',
  API_AUTHORS: 'http://localhost:8081/api/authors',
  API_ANNOUNCEMENTS: 'https://localhost:8081/api/announcements/',
  // AUTH_LOGIN_URL: 'http://netcracker2-back-end.herokuapp.com/auth/login',
  // AUTH_REGISTER_URL: 'http://netcracker2-back-end.herokuapp.com/auth/register',
  // AUTH_ACTIVATION_URL: 'http://netcracker2-back-end.herokuapp.com/auth/activate/',
  // API_PROFILE: 'http://netcracker2-back-end.herokuapp.com/profile',
  // API_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/api/announcements/',
  // API_BOOKS: 'https://netcracker2-back-end.herokuapp.com/api/books',
  // API_BOOK_DOWNLOAD: 'https://netcracker2-back-end.herokuapp.com/api/book/download',
  // API_GENRES:  'https://netcracker2-back-end.herokuapp.com/api/genres',
  // API_AUTHORS: 'https://netcracker2-back-end.herokuapp.com/api/authors',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
