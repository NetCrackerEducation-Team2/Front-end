import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() subtitle: string;
  @Input() url: string;
  @Input() btnText: string;
  @Input() listItemCallback: () => void;
  constructor() { }

  ngOnInit() {
  }

}
