import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { HotelResultComponent } from './hotel-result/hotel-result.component';
import { HotelContentComponent } from './hotel-result/hotel-content/hotel-content.component';
import { HotelFilterComponent } from './hotel-result/hotel-filter/hotel-filter.component';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutesModule } from './app-routes.module';
import { HttpClientService } from './services/http-client.service';
import { SearchResolver } from './resolvers/search-resolver.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SearchHotelComponent,
    HotelResultComponent,
    HotelContentComponent,
    HotelFilterComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    BrowserAnimationsModule,
    AppRoutesModule,
    HttpClientModule,
    MatCheckboxModule,
    
  ],
  providers: [SearchResolver,HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
