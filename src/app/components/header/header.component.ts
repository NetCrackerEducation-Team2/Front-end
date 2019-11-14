import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private accService: AccountService) {
  }

  ngOnInit() {
  }

  isLogged(): boolean {
    return this.accService.getToken() !== null;
  }

}
