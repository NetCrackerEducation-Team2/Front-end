import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckPaginationService {

  constructor(private http: HttpClient) { }

  checkPagination(paramOne: number, paramTwo: number): string {
    let params = new HttpParams();
    let paramsString = '';
    if (paramOne != null) {
      params = params.set('page', paramOne.toString());
    }
    if (paramTwo != null) {
      params = params.set('pageSize', paramTwo.toString());
    }
    if (params.keys().length > 0) {
      paramsString = '?' + params.toString();
    }
    return paramsString;
  }
}
