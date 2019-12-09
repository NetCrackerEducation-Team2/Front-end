import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Settings} from '../../../models/settings';
import {SettingsService} from '../../../service/settings.service';
import {SnackBarService} from "../../../service/presentation-services/snackBar.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: Settings;

  loadSettingsSubscription: Subscription;
  updateSettingsSubscription: Subscription;

  constructor(private settingsService: SettingsService, private snackBarService: SnackBarService) {
  }


  ngOnInit() {
    this.loadUserSettings();
  }

  ngOnDestroy() {
    this.loadSettingsSubscription.unsubscribe();
    this.updateSettingsSubscription.unsubscribe();
  }

  loadUserSettings(): void {
    this.loadSettingsSubscription = this.settingsService.getCurrentUserSettings().subscribe(settings => {
      console.log('Loaded current user settings: ', settings);
      this.settings = settings;
    });
  }

  updateSettings() {
    console.log('Current settings: ', this.settings);
    this.updateSettingsSubscription = this.settingsService.updateUserSettings(this.settings).subscribe(response => {
      if (response) {
        this.snackBarService.openSuccessSnackBar('Settings successfully updated');
      }
    });
  }
}
