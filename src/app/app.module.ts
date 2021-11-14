import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CityBusSearchComponent } from './components/city-bus/city-bus-search/city-bus-search.component';
import { CityBusRouteComponent } from './components/city-bus/city-bus-route/city-bus-route.component';
import { IndexComponent } from './components/index/index.component';
import { NearbyStopComponent } from './components/nearby/nearby-stop/nearby-stop.component';
import { NearbyStopNumComponent } from './components/nearby/nearby-stop-num/nearby-stop-num.component';
import { IntercityBusNormalSearchComponent } from './components/intercity-bus/intercity-bus-normal-search/intercity-bus-normal-search.component';
import { IntercityBusStartEndSearchComponent } from './components/intercity-bus/intercity-bus-start-end-search/intercity-bus-start-end-search.component';
import { IntercityBusPriceQueryComponent } from './components/intercity-bus/intercity-bus-price-query/intercity-bus-price-query.component';
import { IntercityBusTimeTableComponent } from './components/intercity-bus/intercity-bus-time-table/intercity-bus-time-table.component';
import { IntercityBusSelectDateComponent } from './components/intercity-bus/intercity-bus-price-query/select/select-date/intercity-bus-select-date.component';
import { IntercityBusSelectStopComponent } from './components/intercity-bus/intercity-bus-price-query/select/select-stop/intercity-bus-select-stop.component';
import { IntercityBusSelectTimeComponent } from './components/intercity-bus/intercity-bus-price-query/select/select-time/intercity-bus-select-time.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CityBusRouteComponent,
    CityBusSearchComponent,
    NearbyStopComponent,
    NearbyStopNumComponent,
    IntercityBusNormalSearchComponent,
    IntercityBusStartEndSearchComponent,
    IntercityBusPriceQueryComponent,
    IntercityBusTimeTableComponent,
    IntercityBusSelectTimeComponent,
    IntercityBusSelectDateComponent,
    IntercityBusSelectStopComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
