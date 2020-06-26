import {Component, OnInit} from '@angular/core';

import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService, public router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    if (!this.currentUser) {
      this.router.navigate(['login']);
    }
  }
}
