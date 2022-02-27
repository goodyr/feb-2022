import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SwResponse from '../models/sw-response';
import SwCharacter from '../models/sw-character';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  BASE_URL = "https://swapi.dev/api/people";

  constructor(private readonly httpClient: HttpClient) { }

  search(term: string): Observable<SwResponse> {
    return this.httpClient.get<SwResponse>(`${this.BASE_URL}/?search=${term}`);

  }

  getDetails(id: number): Observable<SwCharacter> | undefined {
    return this.httpClient.get<SwCharacter>(`${this.BASE_URL}/${id}`);
  }

  get(page?: number): Observable<SwResponse> {
    return this.httpClient.get<SwResponse>(`${this.BASE_URL}/?page=${page || 1}`);
  }
}
