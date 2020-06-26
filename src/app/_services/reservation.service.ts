import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './car.service';

const API_URL = 'http://localhost:8080/api/reservation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  getAllReservations(): Observable<any> {
    return this.http.get<Rezerwacja[]>(API_URL + '/all');
  }

  addReservation(reservation): Observable<any> {
    return this.http.post(API_URL, {
      klient: reservation.klient,
      samochod: reservation.samochod,
      miejsceOdbioru: reservation.miejsceOdbioru,
      miejsceZwrotu: reservation.miejsceZwrotu,
      dataOdbioru: reservation.dataOdbioru,
      dataZwrotu: reservation.dataZwrotu
    }, httpOptions);
  }

  getByUser(id: number): Observable<any> {
    return this.http.get<Rezerwacja[]>(API_URL + '?username=' + id);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete<Rezerwacja>(API_URL + '?id=' + id);
  }

}


export interface Role {
  id: number;
  name: string;
}

export interface Klient {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface Samochod {
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

export interface MiejsceOdbioru {
  id: number;
  adres: string;
}

export interface MiejsceZwrotu {
  id: number;
  adres: string;
}

export interface Rezerwacja {
  id: number;
  klient: Klient;
  samochod: Samochod;
  miejsceOdbioru: MiejsceOdbioru;
  miejsceZwrotu: MiejsceZwrotu;
  dataOdbioru: Date;
  dataZwrotu: Date;
}

export interface Rezerwacja2 {
  klient: string;
  samochod: number;
  miejsceOdbioru: string;
  miejsceZwrotu: string;
  dataOdbioru: string;
  dataZwrotu: string;
}



