import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { ButtonModule } from 'primeng/button';
import { HeightPipe } from './pipes/height.pipe';
import { ListComponent } from './list/list.component';
import { CardModule } from 'primeng/card';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DetailhomeworldComponent } from './core/detailhomeworld/detailhomeworld.component';
import { DetailspecieComponent } from './core/detailspecie/detailspecie.component';
import { DetailstarshipComponent } from './core/detailstarship/detailstarship.component';
import { DetailvehicleComponent } from './core/detailvehicle/detailvehicle.component';
import { DetailfilmComponent } from './core/detailfilm/detailfilm.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HeightPipe,
    ListComponent,
    DetailhomeworldComponent,
    DetailspecieComponent,
    DetailstarshipComponent,
    DetailvehicleComponent,
    DetailfilmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    InputTextModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
