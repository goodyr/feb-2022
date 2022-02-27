import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private currentPage: number = 1;

  constructor() { }

  get() {
    return this.currentPage;
  }

  set(page: number) {
    return this.currentPage = page;
  }
}
