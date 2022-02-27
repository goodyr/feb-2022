import { Component, Input, OnInit } from '@angular/core';
import { Specie } from 'src/app/models/sw-specie';

@Component({
  selector: 'app-detailspecie',
  templateUrl: './detailspecie.component.html',
  styleUrls: ['./detailspecie.component.scss']
})
export class DetailspecieComponent implements OnInit {

  @Input()
  species: Specie[];

  constructor() {
    this.species = [];
   }

  ngOnInit(): void {
  }

}
