import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() profile: User;


  constructor() {
  }

  private setDefaultAvatar() {
    this.profile.photoPath = '../../../assets/images/default_avatar.jpg';
  }

  ngOnInit() {
    this.setDefaultAvatar();
  }
}
