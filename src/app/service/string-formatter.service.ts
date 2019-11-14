import { Injectable } from '@angular/core';
import {Genre} from "../models/genre";

@Injectable({
  providedIn: 'root'
})
export class StringFormatterService {

  constructor() { }

  arrayPrettyFormat<T>(array: T[], count: number): string {
    if(array.length == 0) {
      return "";
    }
    if(array.length <= count) count = array.length;
    let stringArray = this.subArrayString(array, count);
    let difference = array.length - count;
    return stringArray + (difference == 0 ? "" : " and " + difference + " more");
  }

  subArrayString<T>(array: T[], count: number): string {
    if(array.length <= count || array.length == 0) {
      return "";
    }
    let subArray: T[] = array.slice(0, count);
    let str: string = subArray.join(", ");
    return str.slice(0, str.length - 3);
  }
}
