import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import SwCharacter from 'src/app/models/sw-character';
import SwResponse from 'src/app/models/sw-response';
import { SwapiService } from 'src/app/services/swapi.service';
import { ListService } from 'src/app/services/list.service';
import { debounceTime, distinctUntilChanged, filter, from, fromEvent, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  characters: SwCharacter[] = [];
  nextUrl: string = '';
  previousUrl: string = '';
  isLoading: boolean = true;
  searchText: string = '';

  @ViewChild("globalSearchInput") globalSearchInput!: ElementRef;
  source?: Observable<string>;
  searchEnabled: boolean = false;


  constructor(
    private readonly swApi: SwapiService,
    private readonly listService: ListService
  ) {
  }

  ngOnInit(): void {
    const page = this.listService.get();
    this.loadData(page);
  }

  prev(): void {
    const page = this.setPage(this.previousUrl);
    this.loadData(page);
  }

  next(): void {
    const page = this.setPage(this.nextUrl);
    this.loadData(page);
  }

  loadData(page: number) {
    this.isLoading = true;
    this.swApi.get(page).subscribe((response: SwResponse) => {
      this.parseData(response);
      this.isLoading = false;
    })
  }

  search(event: Event): void {
    const { value } = event.target as HTMLInputElement;

    if (value.length > 3) {
      this.isLoading = true;
      this.swApi.search(value).subscribe((response: SwResponse) => {
        this.parseData(response);
        this.isLoading = false;
      })
    }

    if (value.length == 0)
      this.loadData(this.listService.get());
  }

  private parseData(response: SwResponse) {
    this.characters = response.results as SwCharacter[];
    for (var item of this.characters)
      item.id = Number.parseInt(item.url.match(/\d+/g)![0]);

    this.nextUrl = response.next;
    this.previousUrl = response.previous;
  }

  private getPageFromUrl(url: string): number {
    return url
      ? Number.parseInt(url.substring(url.length - 1))
      : 1;
  }

  private setPage(url: string): number {
    const page = this.getPageFromUrl(url);
    this.listService.set(page);
    return page;
  }



}
