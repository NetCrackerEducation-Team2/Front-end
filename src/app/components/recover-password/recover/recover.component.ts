import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  message: string;
  isError: boolean;
  isDownloading = true;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    const link = this.activatedRoute.snapshot.paramMap.get('link');
    this.authService.getRecoveryPassword(link)
      .subscribe(
        () =>
          this.message = 'New password sent to your email. ',
        () => {
          this.message = 'Invalid recovery link';
          this.isError = true;
          this.isDownloading = false;
        },
        () => this.isDownloading = false
      );
  }


}
