import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }




  ngOnInit() {
  }

  showCreateAdminModerator() {
    this.router.navigate(['create-admin-moderator'], { relativeTo: this.route });

  }

  showEditAdminModerator() {
    this.router.navigate(['edit-admin-moderator'], { relativeTo: this.route });
  }

  showDeleteAdminModerator() {
    this.router.navigate(['delete-admin-moderator'], { relativeTo: this.route });
  }

  showCreateAchievement() {
    this.router.navigate(['create-achievement'], { relativeTo: this.route });
  }
}
