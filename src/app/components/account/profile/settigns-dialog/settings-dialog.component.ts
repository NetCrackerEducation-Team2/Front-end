import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: 'settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {
  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  getOnUpdateCallback() {
    return () => {
      this.close();
    };
  }
}
