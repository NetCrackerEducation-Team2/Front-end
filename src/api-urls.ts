import {environment} from './environments/environment';

export const apiUrls = {
  AUTH_LOGIN_URL: environment.BASE_URL + '/auth/login',
  AUTH_REGISTER_URL: environment.BASE_URL + '/auth/register',
  AUTH_ACTIVATION_URL: environment.BASE_URL + '/auth/activate/',
  API_PROFILE: environment.BASE_URL + '/api/profile',
  API_ANNOUNCEMENTS: environment.BASE_URL + '/api/announcements/',
  AUTH_RECOVER_LINK_URL: environment.BASE_URL + '/auth/recovery-link/',
  AUTH_RECOVER_PASS_URL: environment.BASE_URL + '/auth/recover/',
  API_BOOK: environment.BASE_URL + '/api/book-by-id/',
  API_BOOKS: environment.BASE_URL + '/api/books',
  API_BOOK_INFO: environment.BASE_URL + '/api/book',
  API_BOOK_CREATE: environment.BASE_URL + '/api/book',
  API_BOOK_DOWNLOAD: environment.BASE_URL + '/api/book/download',
  API_BOOK_REVIEW: environment.BASE_URL + '/api/book-review',
  API_USERS_BOOKS: environment.BASE_URL + '/api/users-book',
  API_GENRES: environment.BASE_URL + '/api/genres/',
  API_GENRES_URL: {
    SEARCH_BY_NAME_SUBSTRING: environment.BASE_URL + '/api/genres/searchByNameContains'
  },
  API_AUTHORS: environment.BASE_URL + '/api/authors',
  API_AUTHORS_URL: {
    FIND_URL: environment.BASE_URL + '/api/authors/searchByNameContains'
  },
  API_BOOK_URL: {
    FIND_BY_ID: environment.BASE_URL + '/api/book-by-id/'
  },
  API_REVIEW: environment.BASE_URL + '/api/book-review',
  API_BOOK_TITLE_BY_ID: environment.BASE_URL + '/api/book-title/',
  API_PUBLISHED_BOOK_OVERVIEW: environment.BASE_URL + '/api/book-overviews/published-by-book/',
  API_BOOK_OVERVIEWS_BY_BOOK: environment.BASE_URL + '/api/book-overviews/by-book/',
  API_PUBLISHED_ANNOUNCEMENTS: environment.BASE_URL + '/api/announcements/published/',
  API_OVERVIEWS: environment.BASE_URL + '/api/overviews/',
  API_REVIEWS: environment.BASE_URL + '/api/reviews/',
  API_CREATE_ADMIN_MODERATOR: environment.BASE_URL + '/admins/create',
  API_DELETE_ADMIN_MODERATOR: environment.BASE_URL + '/admins/delete',
  API_GET_ADMIN_MODERATOR: environment.BASE_URL + '/admins',
  API_UPDATE_ADMIN_MODERATOR: environment.BASE_URL + '/admins/update',
  ADMIN_MODERATOR_PUBLISH_OVERVIEW: environment.BASE_URL + '/admins/publish-overview/',
  ADMIN_MODERATOR_PUBLISH_ANNOUNCEMENTS: environment.BASE_URL + '/admins/publish-announcement/',
  ADMIN_MODERATOR_PUBLISH_REVIEW: environment.BASE_URL + '/admins/publish-review/',
  ADMIN_MODERATOR_UNPUBLISHED_ANNOUNCEMENTS: environment.BASE_URL + '/admins/upublish-announcement/',
  ADMIN_MODERATOR_UNPUBLISHED_REVIEW: environment.BASE_URL + '/admins/unpublish-review/',
  ADMIN_MODERATOR_UNPUBLISHED_OVERVIEW: environment.BASE_URL + '/admins/unpublish-overview/',
  API_NOTIFICATION: environment.BASE_URL + '/api/notifications/',
  API_ACHIEVEMENT: {
    API: environment.BASE_URL + '/api/achievement',
    FIND_BY_USER_ID: environment.BASE_URL + '/api/achievement/user/',
  },
  WEBSOCKET: environment.BASE_URL + '/ws'
};
