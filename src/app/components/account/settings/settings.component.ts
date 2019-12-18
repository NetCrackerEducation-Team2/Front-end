import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Settings} from '../../../models/settings';
import {SettingsService} from '../../../service/settings.service';
import {SnackBarService} from '../../../service/presentation-services/snackBar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Input() onSaveCallback: () => void;
  settings: Settings;

  loadSettingsSubscription: Subscription;
  updateSettingsSubscription: Subscription;

  constructor(private settingsService: SettingsService, private snackBarService: SnackBarService) {
  }


  ngOnInit() {
    this.loadUserSettings();
  }

  ngOnDestroy() {
    if (this.loadSettingsSubscription) {
      this.loadSettingsSubscription.unsubscribe();
    }
    if (this.updateSettingsSubscription) {
      this.updateSettingsSubscription.unsubscribe();
    }
  }

  loadUserSettings(): void {
    this.loadSettingsSubscription = this.settingsService.getCurrentUserSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

  updateSettings() {
    this.updateSettingsSubscription = this.settingsService.updateUserSettings(this.settings).subscribe(response => {
      if (response) {
        this.snackBarService.openSuccessSnackBar('Settings successfully updated');
        this.onSaveCallback();
      }
    });
  }
}
