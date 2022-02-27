import { Component, Input, OnInit } from '@angular/core';
import Starship from 'src/app/models/sw-starship';

@Component({
  selector: 'app-detailstarship',
  templateUrl: './detailstarship.component.html',
  styleUrls: ['./detailstarship.component.scss']
})
export class DetailstarshipComponent implements OnInit {

  @Input()
  starships: Starship[];

  constructor() {
    this.starships = [];
   }

  ngOnInit(): void {
  }

}
