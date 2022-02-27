import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MoreDetailRequest from '../models/more-detail-request';
import MoreDetailResponse from '../models/more-detail-response';
import SwCharacter from '../models/sw-character';
import Film from '../models/sw-film';
import HomeWorld from '../models/sw-homeworld';
import { Specie } from '../models/sw-specie';
import Starship from '../models/sw-starship';
import Vehicle from '../models/sw-vehicle';
import { SwapiService } from '../services/swapi.service';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  character?: SwCharacter;
  page: any;
  aditionalInfoLoaded: boolean = false;
  loadingData: boolean = false;

  moreDetailInfo?: MoreDetailResponse;
  error: any;

  constructor(
    private readonly aRoute: ActivatedRoute,
    private readonly swService: SwapiService,
    private readonly detailsService: DetailsService
  ) { }

  ngOnInit(): void {
    const { id } = this.aRoute.snapshot.params as any;
    this.swService.getDetails(id)?.subscribe(data => { this.character = data });

  }

  getMoreDetails() {
    this.loadingData = true;
    if (!this.character)
      return;

    const request: MoreDetailRequest = {
      homeWorldUrl: this.character?.homeworld,
      filmsUrl: this.character?.films,
      specieUrl: this.character?.species,
      starShipsUrl: this.character?.starships,
      vehiclesUrl: this.character?.vehicles
    }

    const tempData: any[] = [];
    this.detailsService.getDetails(request).subscribe(
      {
        next: (data: any) => {
          tempData.push(data);
        },
        error: (err: any) => {
          this.loadingData = false;
          this.aditionalInfoLoaded = false;
          this.error = err;
        },
        complete: () => {
          this.organizeData(tempData, request);
          this.aditionalInfoLoaded = true;
          this.loadingData = false;
        }
      }
    );
  }

  organizeData(data: any[], request: MoreDetailRequest) {

    this.moreDetailInfo = {
      homeWorld: data[0] as HomeWorld,
      films: [] as Film[],
      species: [] as Specie[],
      starShips: [] as Starship[],
      vehicles: [] as Vehicle[]
    }

    for (let idx = 1; idx < data.length; idx++) {

      if (this.moreDetailInfo.films && this.moreDetailInfo.films.length < request.filmsUrl.length) {
        this.moreDetailInfo.films.push(data[idx] as Film)
      } else if (this.moreDetailInfo.species && request.specieUrl && this.moreDetailInfo.species.length < request.specieUrl.length) {
        this.moreDetailInfo.species.push(data[idx] as Specie)
      } else if (this.moreDetailInfo.starShips && request.starShipsUrl && this.moreDetailInfo.starShips.length < request.starShipsUrl.length) {
        this.moreDetailInfo.starShips.push(data[idx] as Starship);
      } else if (this.moreDetailInfo.vehicles && request.vehiclesUrl && this.moreDetailInfo.vehicles.length < request.vehiclesUrl.length) {
        this.moreDetailInfo.vehicles.push(data[idx] as Vehicle);
      }
    }
  }
}
