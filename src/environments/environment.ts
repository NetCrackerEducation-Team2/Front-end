// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const BASE_URL = 'http://localhost:8081';

export const environment = {
  production: false,
  AUTH_LOGIN_URL: BASE_URL + '/auth/login',
  AUTH_REGISTER_URL: BASE_URL + '/auth/register',
  AUTH_ACTIVATION_URL: BASE_URL + '/auth/activate/',
  API_PROFILE: BASE_URL + '/profile',
  API_ANNOUNCEMENTS: BASE_URL + '/api/announcements/',
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
  API_ACTIVITIES: {
    GET_LAST_ACTIVITIES: BASE_URL + '/api/activity/lastFriendActivities'
  },
  API_USERS: {
    SEARCH_USERS_URL: BASE_URL + '/api/profile/search'
  },
  API_FRIENDS: {
    API_FRIENDS_STATUS: BASE_URL + '/api/friends/getFriendInfo',
    API_FRIEND_REQUEST: BASE_URL + '/api/friends/friendRequest'
  },
  API_REVIEW: BASE_URL + '/api/book-review',
  API_BOOK_TITLE_BY_ID: 'http://localhost:8081/api/book-title/',
  API_PUBLISHED_BOOK_OVERVIEW: 'http://localhost:8081/api/published-by-book/',
  API_BOOK_OVERVIEWS_BY_BOOK: 'http://localhost:8081/api/book-overviews/by-book/',
  API_CREATE_ADMIN_MODERATOR: 'http://localhost:8081/admins/create',
  API_DELETE_ADMIN_MODERATOR: 'http://localhost:8081/admins/delete',
  API_GET_ADMIN_MODERATOR: 'http://localhost:8081/admins',
  API_UPDATE_ADMIN_MODERATOR: 'http://localhost:8081/admins/update'
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
  // AUTH_RECOVER_PASS_URL: 'https://netcracker2-back-end.herokuapp.com/auth/recover/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
