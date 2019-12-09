import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Style {
  style: string;
  val: string;
}

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.css']
})
export class ShowHideComponent implements OnInit {

  @Input() label: string;
  @Input() styles?: object;
  isShow!: boolean;

  toggle = () => this.isShow = !this.isShow;

  constructor() {
    this.isShow = false;
  }

  ngOnInit() {
  }

}
