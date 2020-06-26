import {Component, OnInit} from '@angular/core';
import {ReservationService, Rezerwacja} from '../_services/reservation.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  reservarions: Rezerwacja[];

  constructor(private reservationService: ReservationService, private token: TokenStorageService, public router: Router) {
  }

  ngOnInit() {
    if (!this.token.getUser()) {
      this.router.navigate(['login']);
    }
    if (this.token.getUser().roles[0] !== 'ROLE_ADMIN') {
      this.router.navigate(['home']);
    }

    this.reservationService.getAllReservations().subscribe(
      value => {
        this.reservarions = value as Rezerwacja[];
      });
  }

  usun(id: number) {
    this.reservationService.deleteReservation(id).subscribe();
    window.location.reload();
  }
}
