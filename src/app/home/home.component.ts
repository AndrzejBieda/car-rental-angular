import {Component, OnInit} from '@angular/core';
import {Car, CarService} from '../_services/car.service';
import {Place, PlaceService} from '../_services/place.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  places: Place[] = [];
  model: WhenAndWhere = {
    miejsceOdbioru: '',
    miejsceZwrotu: '',
    dataOdbioru: '',
    dataZwrotu: '',
  };
  dateDataOdbioru: any;
  dateDataZwrotu: any;
  myDate = new Date();

  constructor(private router: Router,
              private carService: CarService, private placeService: PlaceService) {
  }

  ngOnInit() {
    this.carService.getAllCars().subscribe(
      value => {
        this.cars = value as Car[];
      });
    this.placeService.getAllPlaces().subscribe(
      value => {
        this.places = value as Place[];
      });
  }

  findCars(): void {
    this.dateDataOdbioru = new Date(this.model.dataOdbioru);
    this.dateDataZwrotu = new Date(this.model.dataZwrotu);
    if (this.dateDataOdbioru >= this.myDate && this.dateDataOdbioru <= this.dateDataZwrotu) {
      if (this.model.dataOdbioru || this.model.dataZwrotu) {
        if (!this.model.miejsceOdbioru) {
          this.model.miejsceOdbioru = this.places[0].adres;
        }
        if (!this.model.miejsceZwrotu) {
          this.model.miejsceZwrotu = this.places[0].adres;
        }
        this.router.navigate(['cars'], {
          state: {
            miejsceOdbioru: this.model.miejsceOdbioru, miejsceZwrotu: this.model.miejsceZwrotu,
            dataOdbioru: this.model.dataOdbioru, dataZwrotu: this.model.dataZwrotu
          }
        });
      }
    }
  }
}

export interface WhenAndWhere {
  miejsceOdbioru: any;
  miejsceZwrotu: any;
  dataOdbioru: any;
  dataZwrotu: any;
}
