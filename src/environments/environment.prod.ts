// export const BASE_URL = 'http://localhost:8081'
export const BASE_URL = 'https://netcracker2-back-end.herokuapp.com'
export const environment = {
  production: true,

  AUTH_LOGIN_URL: BASE_URL + '/auth/login',
  AUTH_REGISTER_URL: BASE_URL + '/auth/register',
  AUTH_ACTIVATION_URL: BASE_URL + '/auth/activate/',
  API_PROFILE: BASE_URL + '/profile',
  API_ANNOUNCEMENTS: BASE_URL + '/api/announcements/'
};
