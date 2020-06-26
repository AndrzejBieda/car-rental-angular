import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {Car, CarService} from '../_services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  miejsceOdbioru: any;
  miejsceZwrotu: any;
  dataOdbioru: any;
  dataZwrotu: any;
  dateDataOdbioru: any;
  dateDataZwrotu: any;
  datyDiff: any;


  constructor(private token: TokenStorageService, public router: Router, private carService: CarService) {
  }

  ngOnInit() {
    if (!this.token.getUser()) {
      this.router.navigate(['login']);
    }
    if (!history.state.dataZwrotu || !history.state.dataZwrotu) {
      this.router.navigate(['home']);
    }

    this.carService.getAllCars().subscribe(
      value => {
        this.cars = value as Car[];
      });
    this.miejsceOdbioru = history.state.miejsceOdbioru;
    this.miejsceZwrotu = history.state.miejsceZwrotu;
    this.dataOdbioru = history.state.dataOdbioru;
    this.dataZwrotu = history.state.dataZwrotu;

    this.dateDataOdbioru = new Date(this.dataOdbioru);
    this.dateDataZwrotu = new Date(this.dataZwrotu);
    this.datyDiff = 1 + Math.floor((this.dateDataZwrotu - this.dateDataOdbioru) / (1000 * 60 * 60 * 24));
  }

  findCar(id: number) {
    this.router.navigate(['details'], {
      state: {
        miejsceOdbioru: this.miejsceOdbioru, miejsceZwrotu: this.miejsceZwrotu,
        dataOdbioru: this.dataOdbioru, dataZwrotu: this.dataZwrotu, carId: id
      }
    });

  }
}
