import { Component, OnInit } from '@angular/core';
import {Car, CarService} from '../_services/car.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  car: Car;
  miejsceOdbioru: any;
  miejsceZwrotu: any;
  dataOdbioru: any;
  dataZwrotu: any;
  dateDataOdbioru: any;
  dateDataZwrotu: any;
  datyDiff: any;
  carId: any;



  constructor(private token: TokenStorageService, public router: Router, private carService: CarService) {
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

}
