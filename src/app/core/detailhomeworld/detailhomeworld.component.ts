import { Component, Input, OnInit } from '@angular/core';
import HomeWorld from 'src/app/models/sw-homeworld';

@Component({
  selector: 'app-detailhomeworld',
  templateUrl: './detailhomeworld.component.html',
  styleUrls: ['./detailhomeworld.component.scss']
})
export class DetailhomeworldComponent implements OnInit {


  @Input()
  homeworld!: HomeWorld;

  constructor() { }

  ngOnInit(): void {
  }

}
