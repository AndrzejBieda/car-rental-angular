import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/place/';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getAllPlaces(): Observable<any> {
    return this.http.get<Place[]>(API_URL + 'all');
  }

}

export interface Place {
  id: number;
  adres: string;
}
