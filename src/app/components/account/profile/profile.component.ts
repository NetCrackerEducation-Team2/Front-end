import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {};

  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService) {
  }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.accountService.getUserById(userId)
      .subscribe(
        user => {
          this.profile = user;
        },
        error => {
          console.log('Error');
          console.error(error.error);
          // handle error
        }
      );
  }

  edit() {
    console.log('edit button clicked');
  }
}
