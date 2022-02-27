import { Component, Input, OnInit } from '@angular/core';
import Vehicle from 'src/app/models/sw-vehicle';

@Component({
  selector: 'app-detailvehicle',
  templateUrl: './detailvehicle.component.html',
  styleUrls: ['./detailvehicle.component.scss']
})
export class DetailvehicleComponent implements OnInit {


  @Input()
  vehicles: Vehicle[];

  constructor() {
    this.vehicles = [];
   }

  ngOnInit(): void {
  }

}
