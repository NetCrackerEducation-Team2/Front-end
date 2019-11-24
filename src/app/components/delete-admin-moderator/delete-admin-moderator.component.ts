import { Component, OnInit } from '@angular/core';

import {AdminModeratorService} from '../../service/admin-moderator.service';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-delete-admin-moderator',
  templateUrl: './delete-admin-moderator.component.html',
  styleUrls: ['./delete-admin-moderator.component.css']
})
export class DeleteAdminModeratorComponent implements OnInit {

  userId: number;
  isDownloading = true;
  constructor(private admModerService: AdminModeratorService) {
  }


  ngOnInit() {
  }

  deleteUser(userId) {
    console.log(this.userId);
    this.admModerService.
    deleteAdminModer(this.userId).pipe(take(1)).
    subscribe();
  }
}
