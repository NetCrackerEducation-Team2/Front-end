import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormatterService {

  constructor() { }

  arrayPrettyFormat(array: string[], count: number): string {
    if(array.length == 0) {
      return "";
    }
    if(array.length < count) {
      count = array.length;
    }
    let stringArray = this.subArrayString(array, count);
    let difference = array.length - count;
    return stringArray + (difference == 0 ? "" : " and " + difference + " more");
  }

  subArrayString(array: string[], count: number): string {
    if(array.length == 0) {
      return "";
    }
    if(array.length < count) {
      count = array.length;
    }
    let subArray: string[] = array.slice(0, count);
    return subArray.join(", ");
  }

  formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
}
