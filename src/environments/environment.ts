// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // AUTH_LOGIN_URL: 'http://localhost:8081/auth/login',
  // AUTH_REGISTER_URL: 'http://localhost:8081/auth/register',
  // AUTH_ACTIVATION_URL: 'http://localhost:8081/auth/activate/',
  // API_PROFILE : 'http://localhost:8081/profile',

  AUTH_LOGIN_URL: 'http://netcracker2-back-end.herokuapp.com/auth/login',
  AUTH_REGISTER_URL: 'http://netcracker2-back-end.herokuapp.com/auth/register',
  AUTH_ACTIVATION_URL: 'http://netcracker2-back-end.herokuapp.com/auth/activate/',
  API_PROFILE: 'http://netcracker2-back-end.herokuapp.com/profile',
  API_ANNOUNCEMENTS: 'https://netcracker2-back-end.herokuapp.com/api/announcements/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
