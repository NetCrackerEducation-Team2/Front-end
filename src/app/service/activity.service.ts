import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Activity} from '../models/activity';
import {Page} from '../models/page';
import {apiUrls} from "../../api-urls";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly API_GET_LAST_ACTIVITIES;

  constructor(private http: HttpClient) {
    this.API_GET_LAST_ACTIVITIES = apiUrls.API_ACTIVITIES.GET_LAST_ACTIVITIES;
  }

  getLastFriendActivities(pageIndex: number, pageSize: number): Observable<Page<Activity>> {
    if(pageSize && pageIndex) {
      const params = new HttpParams().set('page', pageIndex.toString()).set('pageSize', pageSize.toString());
      return this.http.get<Page<Activity>>(this.API_GET_LAST_ACTIVITIES, {params});
    } else {
      return this.http.get<Page<Activity>>(this.API_GET_LAST_ACTIVITIES);
    }
  }
}
