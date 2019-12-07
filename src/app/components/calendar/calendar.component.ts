import { Component, OnInit } from '@angular/core';
import {Tile} from '../../models/calendar-models';
import * as constants from '../../state/constants';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  tiles: Tile[];
  currentYear: number;
  currentMonth: number;
  currentMonthLabel: string;
  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.currentMonthLabel = constants.months[this.currentMonth];
    this.updateTiles();
  }

  updateTiles(): void {
    this.tiles = [];
    for(let i = 1; i <= this.daysInMonth(this.currentMonth % 12 + 1, this.currentYear); i++) {
      this.tiles.push(new Tile(i));
    }
    if (constants.months[0] === constants.months[this.currentMonth]){

    }
    this.tiles.forEach(tile => tile.text = 'lala');



  }

  daysInMonth(month, year): number {
    return (new Date(year, month, 0)).getDate();
  }

  forward(): void {
    console.log(this.currentMonth);
    if (this.currentMonth === 12 - 1) {
      this.currentYear += 1;
    }
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.currentMonthLabel = constants.months[this.currentMonth];
    this.updateTiles();

  }

  back(): void {
    if (this.currentMonth === 0) {
      this.currentYear -= 1;
    }
    this.currentMonth = (this.currentMonth + (12 - 1)) % 12;
    this.currentMonthLabel = constants.months[this.currentMonth];
    this.updateTiles();
  }
  today(): void {


  }

}
