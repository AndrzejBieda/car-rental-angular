import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<any> {
    return this.http.get<Car[]>(API_URL + '/all');
  }

  getCar(id: number): Observable<any> {
    return this.http.get<Car>(API_URL + '?id=' + id);
  }

}

export interface Car {
  id: number;
  marka: string;
  model: string;
  miejsca: string;
  pakownosc: string;
  drzwi: string;
  skrzynia: string;
  klima: string;
  paliwo: string;
  cena: number;
  kaucja: number;
}
