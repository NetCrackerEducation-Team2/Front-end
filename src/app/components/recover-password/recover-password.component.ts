import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  email: string;
  message: string;
  isError: boolean;
  submitted = false;
  isDownloading = false;
  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  submit() {
    this.isDownloading = true;
    this.submitted = true;
    this.authService.getRecoveryCode(this.email)
      .subscribe(
        () => this.message = 'Recovery link sent to your email',
        (error: HttpErrorResponse) => {
          console.log(error);
          this.message = 'Some unknown error occurred. Try to recover password again.';
          if (typeof error.error === 'string') {
            this.message = error.error;
          }
          this.isError = true;
          this.isDownloading = false;
        },
        () => this.isDownloading = false
      );
  }
}
