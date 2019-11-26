import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrls} from '../../api-urls';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminModeratorService {

  private readonly API_CREATE_ADMIN_MODERATOR;
  private readonly API_DELETE_ADMIN_MODERATOR;
  private readonly API_UPDATE_ADMIN_MODERATOR;
  private readonly API_GET_ADMIN_MODERATOR;

  constructor(private httpClient: HttpClient) {
    this.API_CREATE_ADMIN_MODERATOR = apiUrls.API_CREATE_ADMIN_MODERATOR;
    this.API_DELETE_ADMIN_MODERATOR = apiUrls.API_DELETE_ADMIN_MODERATOR;
    this.API_UPDATE_ADMIN_MODERATOR = apiUrls.API_UPDATE_ADMIN_MODERATOR;
    this.API_GET_ADMIN_MODERATOR = apiUrls.API_GET_ADMIN_MODERATOR;
   }

  createAdminModer(fullName, email, password, role): Observable<any> {
    return this.httpClient.post<any>(this.API_CREATE_ADMIN_MODERATOR, JSON.stringify({fullName, email, password, role}));
  }

  deleteAdminModer(userid): Observable<any> {
    console.log(userid);
    return this.httpClient.post<any>(this.API_DELETE_ADMIN_MODERATOR, userid );
  }

  updateAdminModer(code: string): Observable<any> {
    return this.httpClient.get(this.API_UPDATE_ADMIN_MODERATOR   + code);
  }
}
