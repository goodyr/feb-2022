import { HttpClient } from '@angular/common/http';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { delay, forkJoin, from, merge, mergeMap, Observable, of, tap } from 'rxjs';
import MoreDetailRequest from '../models/more-detail-request';
import MoreDetailResponse from '../models/more-detail-response';
import Film from '../models/sw-film';
import HomeWorld from '../models/sw-homeworld';
import { Specie } from '../models/sw-specie';
import Starship from '../models/sw-starship';
import Vehicle from '../models/sw-vehicle';

const DELAY_TIME = 500;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private readonly httpClient: HttpClient) { }

  getDetails(request: MoreDetailRequest): Observable<any> {
    const arrayPromise = [];

    arrayPromise.push(this.callApiWithDelay<HomeWorld>(request.homeWorldUrl));
    for (var url of request.filmsUrl)
      arrayPromise.push(this.callApiWithDelay<Film>(url));

    if (request.specieUrl && request.specieUrl.length > 0)
      request.specieUrl.forEach(url => {
        arrayPromise.push(this.callApiWithDelay<Specie>(url));
      });

    if (request.starShipsUrl && request.starShipsUrl.length > 0)
      request.starShipsUrl.forEach(url => {
        arrayPromise.push(this.callApiWithDelay<Starship>(url));
      });

    if (request.vehiclesUrl && request.vehiclesUrl.length > 0)
      request.vehiclesUrl.forEach(url => {
        arrayPromise.push(this.callApiWithDelay<Vehicle>(url));
      });

    return from(arrayPromise).pipe(mergeMap(item => item, 1));
  }

  private callApiWithDelay<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(delay(DELAY_TIME))
  }
}

