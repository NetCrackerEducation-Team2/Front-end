// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {BASE_URL} from './environment.prod';

export const environment = {
  production: false,
  // AUTH_LOGIN_URL: 'http://localhost:8081/auth/login',
  // AUTH_REGISTER_URL: 'http://localhost:8081/auth/register',
  // AUTH_ACTIVATION_URL: 'http://localhost:8081/auth/activate/',
  // API_PROFILE : 'http://localhost:8081/profile'

  AUTH_LOGIN_URL: BASE_URL + '/auth/login',
  AUTH_REGISTER_URL: BASE_URL + '/auth/register',
  AUTH_ACTIVATION_URL: BASE_URL + '/auth/activate/',
  API_PROFILE: BASE_URL + '/profile',
  API_ANNOUNCEMENTS: BASE_URL + '/api/announcements/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
