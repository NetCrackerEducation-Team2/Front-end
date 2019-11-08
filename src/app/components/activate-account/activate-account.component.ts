import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  message: string;
  isError: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService) {
    this.isError = false;
  }

  ngOnInit() {
    this.sendActivationCode();
  }

  sendActivationCode() {
    const code = this.activatedRoute.snapshot.paramMap.get('code');
    this.authService.sendActivationCode(code)
      .subscribe(
        resp => {
          console.log('Activation code is admitted');
          this.message = 'Please login into your account, by link below';
          this.isError = false;
        },
        err => {
          console.error('Activation is rejected');
          this.message = 'Some error occurred. Please try again.';
          this.isError = true;
        }
      );
  }
}
