import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }




  ngOnInit() {
  }

  showCreateAdmin() {
    this.router.navigate(['create-admin'], { relativeTo: this.route });

  }

  showCreateModerator() {
    this.router.navigate(['create-moderator'], { relativeTo: this.route });
  }

  showEditModerator() {
    this.router.navigate(['edit-moderator'], { relativeTo: this.route });
  }
}
