import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../service/account.service';
import {User} from '../../../models/user';


// tslint:disable-next-line:component-class-suffix
class Account extends User {
  optionArr: any[];
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isUpdated: boolean;

  user: Account = {
    enabled: true,
    userId: null,
    fullName: null,
    email: null,
    createdAt: null,
    photoPath: null,
    optionArr: [
      {title: 'Book adding', subscribed: false},
      {title: 'End of reading', subscribed: false},
      {title: 'My achievements', subscribed: true},
      {title: 'My reviews', subscribed: false},
      {title: 'Add to favourite', subscribed: true}
    ]
  };

  private userId: number;

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute) {
    this.isUpdated = false;
  }

  ngOnInit() {
    const currentUser = this.accountService.getCurrentUser();
    this.userId = +this.activatedRoute.snapshot.paramMap.get('userId');

    if (!currentUser || currentUser && currentUser.userId !== this.userId) {
      this.router.navigate(['']);
    }

    this.accountService.getUserById(this.userId)
      .subscribe(
        (user: User) => {
          this.user.fullName = user.fullName;
          this.user.email = user.email;
          this.user.photoPath = user.photoPath;
        },
        error => {
          console.log(error);
        }
      );
  }

  save() {
    console.log('saving changes...');
    this.accountService.updateUser(this.user).subscribe(
      () => this.router.navigate(['/profile', this.userId]),
      () => this.router.navigate(['/profile', this.userId])
    );
  }
}
