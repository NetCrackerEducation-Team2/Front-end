export const BASE_URL = 'https://netcracker2-back-end.herokuapp.com';
export const environment = {
  production: true,
  API_BOOK: 'https://netcracker2-back-end.herokuapp.com/api/book-by-id/',
  API_BOOKS: 'https://netcracker2-back-end.herokuapp.com/api/books',
  API_BOOK_INFO: BASE_URL + '/api/book',
  API_BOOK_CREATE: BASE_URL + '/api/book',
  API_BOOK_URL: {
    FIND_BY_ID: BASE_URL + '/api/book-by-id/'
  },
  API_GENRES_URL: {
    SEARCH_BY_NAME_SUBSTRING: BASE_URL + '/api/genres/searchByNameContains'
  },
  API_AUTHORS_URL: {
    FIND_URL: BASE_URL + '/api/authors/searchByNameContains'
  },
  API_REVIEW: BASE_URL + '/api/book-review',
  API_BOOK_DOWNLOAD: 'https://netcracker2-back-end.herokuapp.com/api/book/download',
  API_GENRES: 'https://netcracker2-back-end.herokuapp.com/api/genres',
  API_AUTHORS: 'https://netcracker2-back-end.herokuapp.com/api/authors',
  API_BOOK_TITLE_BY_ID: 'https://netcracker2-back-end.herokuapp.com/api/book-title/',
  API_PUBLISHED_BOOK_OVERVIEW: 'https://netcracker2-back-end.herokuapp.com/api/published-by-book/',
  API_BOOK_OVERVIEWS_BY_BOOK: 'https://netcracker2-back-end.herokuapp.com/api/book-overviews/by-book/',
  API_PROFILE: 'https://netcracker2-back-end.herokuapp.com/api/profile',
  API_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/api/announcements/',
  API_OVERVIEWS: 'https://netcracker2-back-end.herokuapp.com/api/overviews/',
  API_REVIEWS: 'https://netcracker2-back-end.herokuapp.com/api/reviews/',
  API_PUBLISHED_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/api/announcements/published/',
  AUTH_LOGIN_URL: 'https://netcracker2-back-end.herokuapp.com/auth/login',
  AUTH_REGISTER_URL: 'https://netcracker2-back-end.herokuapp.com/auth/register',
  AUTH_ACTIVATION_URL: 'https://netcracker2-back-end.herokuapp.com/auth/activate/',
  AUTH_RECOVER_LINK_URL: 'https://netcracker2-back-end.herokuapp.com/auth/recovery-link/',
  AUTH_RECOVER_PASS_URL: 'https://netcracker2-back-end.herokuapp.com/auth/recover/',
  API_CREATE_ADMIN_MODERATOR: 'https://netcracker2-back-end.herokuapp.com/admins/create',
  API_DELETE_ADMIN_MODERATOR: 'https://netcracker2-back-end.herokuapp.com/admins/delete',
  API_GET_ADMIN_MODERATOR: 'https://netcracker2-back-end.herokuapp.com/admins',
  API_UPDATE_ADMIN_MODERATOR: 'https://netcracker2-back-end.herokuapp.com/admins/update',
  ADMIN_MODERATOR_PUBLISH_OVERVIEW: 'https://netcracker2-back-end.herokuapp.com/admins/publish-overview/',
  ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/admins/publish-announcement/',
  ADMIN_MODERATOR_PUBLISH_REVIEW: 'https://netcracker2-back-end.herokuapp.com/admins/publish-review/',
  ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/admins/upublish-announcement/',
  ADMIN_MODERATOR_UNPUBLISHED_REVIEW: 'https://netcracker2-back-end.herokuapp.com/admins/unpublish-review/',
  ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW: 'https://netcracker2-back-end.herokuapp.com/admins/unpublish-overview/'
};
