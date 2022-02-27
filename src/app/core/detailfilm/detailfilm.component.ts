import { Component, Input, OnInit } from '@angular/core';
import Film from 'src/app/models/sw-film';

@Component({
  selector: 'app-detailfilm',
  templateUrl: './detailfilm.component.html',
  styleUrls: ['./detailfilm.component.scss']
})
export class DetailfilmComponent implements OnInit {

  @Input()
  films: Film[];

  constructor() {
    this.films = [];
  }

  ngOnInit(): void {
  }

}
