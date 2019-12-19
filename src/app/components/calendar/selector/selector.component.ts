import { Component } from '@angular/core';
import {DateService} from '../../../service/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  constructor(public dateService: DateService) { }
  go(dir: number) {
    this.dateService.changeMonth(dir);
  }
  today() {
    this.dateService.changeDate(moment(new Date()));
  }

}
