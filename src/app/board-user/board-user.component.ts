import { Component, OnInit } from '@angular/core';
import {ReservationService, Rezerwacja} from '../_services/reservation.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  reservarions: Rezerwacja[];

  constructor(private reservationService: ReservationService, private token: TokenStorageService, public router: Router) {
  }

  ngOnInit() {
    if (!this.token.getUser()) {
      this.router.navigate(['login']);
    }
    if (this.token.getUser().roles[0] !== 'ROLE_USER') {
      this.router.navigate(['home']);
    }

    this.reservationService.getByUser(this.token.getUser().username).subscribe(
      value => {
        this.reservarions = value as Rezerwacja[];
      });
  }
}
