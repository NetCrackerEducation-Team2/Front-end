import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {apiUrls} from '../../api-urls';
import {Observable} from 'rxjs';
import {Settings} from '../models/settings';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly API_SETTINGS;

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
    this.API_SETTINGS = apiUrls.API_SETTINGS;
  }

  getCurrentUserSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.API_SETTINGS).pipe(
      catchError(this.errorHandlerService.handleError<any>('Loading settings', null))
    );
  }

  updateUserSettings(settings: Settings): Observable<string> {
    return this.http.put<string>(this.API_SETTINGS, settings).pipe(
      map(s => 'OK'),
      catchError(this.errorHandlerService.handleError<any>('Updating settings', null))
    );
  }
}
