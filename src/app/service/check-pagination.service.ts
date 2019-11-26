import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckPaginationService {

  constructor(private http: HttpClient) { }

  checkPagination(page: number, pageSize: number): string {
    let params = new HttpParams();
    let paramsString = '';
    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (pageSize != null) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    return paramsString;
  }
}
