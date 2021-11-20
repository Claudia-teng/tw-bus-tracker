import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routing';

// Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { GMapModule } from 'primeng/gmap';

// Component
import { AppComponent } from './app.component';
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
import { CityBusMapComponent } from './components/city-bus/city-bus-map/city-bus-map.component';
import { AuthInterceptorService } from './auth/auth.intercepter.service';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CityBusRouteComponent,
    CityBusSearchComponent,
    CityBusMapComponent,
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
    GMapModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
