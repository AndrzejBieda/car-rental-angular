import {Component, OnInit} from '@angular/core';
import {Car, CarService} from '../_services/car.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {ReservationService, Rezerwacja2} from '../_services/reservation.service';
import {error} from 'util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  car: Car;
  miejsceOdbioru: any;
  miejsceZwrotu: any;
  dataOdbioru: any;
  dataZwrotu: any;
  dateDataOdbioru: any;
  dateDataZwrotu: any;
  datyDiff: any;
  carId: any;
  reservation: {};
  errorMessage = '';


  constructor(private token: TokenStorageService, public router: Router, private carService: CarService,
              private reservationService: ReservationService) {
  }

  ngOnInit() {
    if (!this.token.getUser()) {
      this.router.navigate(['login']);
    }
    if (!history.state.dataZwrotu || !history.state.dataZwrotu || !history.state.carId) {
      this.router.navigate(['home']);
    }
    window.scroll(0, 0);
    this.miejsceOdbioru = history.state.miejsceOdbioru;
    this.miejsceZwrotu = history.state.miejsceZwrotu;
    this.dataOdbioru = history.state.dataOdbioru;
    this.dataZwrotu = history.state.dataZwrotu;
    this.carId = history.state.carId;

    this.dateDataOdbioru = new Date(this.dataOdbioru);
    this.dateDataZwrotu = new Date(this.dataZwrotu);
    this.datyDiff = 1 + Math.floor((this.dateDataZwrotu - this.dateDataOdbioru) / (1000 * 60 * 60 * 24));

    this.carService.getCar(this.carId).subscribe(
      value => {
        this.car = value as Car;
      });

  }

  makeReservation() {
    this.reservation = {
      klient: this.token.getUser().username,
      samochod: this.carId,
      miejsceOdbioru: this.miejsceOdbioru,
      miejsceZwrotu: this.miejsceZwrotu,
      dataOdbioru: this.dataOdbioru,
      dataZwrotu: this.dataZwrotu
    };

    this.reservationService.addReservation(this.reservation).subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.errorMessage = err.error.message;
        console.error(err);
      }
    );
    this.router.navigate(['success'], {
      state: {
        miejsceOdbioru: this.miejsceOdbioru, miejsceZwrotu: this.miejsceZwrotu,
        dataOdbioru: this.dataOdbioru, dataZwrotu: this.dataZwrotu, carId: this.carId
      }
    });
  }
}
