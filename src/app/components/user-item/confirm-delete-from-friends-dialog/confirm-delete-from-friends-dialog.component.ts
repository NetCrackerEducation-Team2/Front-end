import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'confirm-delete-from-friends-dialog.component.html',
  styleUrls: ['./confirm-delete-from-friends-dialog.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class ConfirmDeleteFromFriendsDialog implements OnInit {
  username: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteFromFriendsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {username: string}) {}

  ngOnInit(): void {
    this.username = this.data.username;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
