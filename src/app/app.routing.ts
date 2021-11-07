import { Routes } from '@angular/router';
import { CityBusRouteComponent } from './components/city-bus/city-bus-route/city-bus-route.component';
import { CityBusSearchComponent } from './components/city-bus/city-bus-search/city-bus-search.component';
import { IndexComponent } from './components/index/index.component';
import { IntercityBusNormalSearchComponent } from './components/intercity-bus/intercity-bus-normal-search/intercity-bus-normal-search.component';
import { IntercityBusPriceQueryComponent } from './components/intercity-bus/intercity-bus-price-query/intercity-bus-price-query.component';
import { IntercityBusSelectDateComponent } from './components/intercity-bus/intercity-bus-price-query/select/select-date/intercity-bus-select-date.component';
import { IntercityBusSelectStopComponent } from './components/intercity-bus/intercity-bus-price-query/select/select-stop/intercity-bus-select-stop.component';
import { IntercityBusSelectTimeComponent } from './components/intercity-bus/intercity-bus-price-query/select/select-time/intercity-bus-select-time.component';
import { IntercityBusStartEndSearchComponent } from './components/intercity-bus/intercity-bus-start-end-search/intercity-bus-start-end-search.component';
import { IntercityBusTimeTableComponent } from './components/intercity-bus/intercity-bus-time-table/intercity-bus-time-table.component';
import { NearbyStopNumComponent } from './components/nearby/nearby-stop-num/nearby-stop-num.component';
import { NearbyStopComponent } from './components/nearby/nearby-stop/nearby-stop.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'city-bus/search', component: CityBusSearchComponent },
  { path: 'city-bus/route', component: CityBusRouteComponent },
  { path: 'nearby/stop', component: NearbyStopComponent },
  { path: 'nearby/stop-num', component: NearbyStopNumComponent },
  { path: 'intercity-bus/normal-search', component: IntercityBusNormalSearchComponent },
  { path: 'intercity-bus/start-end-search', component: IntercityBusStartEndSearchComponent },
  { path: 'intercity-bus/price-query', component: IntercityBusPriceQueryComponent },
  { path: 'intercity-bus/time-table', component: IntercityBusTimeTableComponent },
  { path: 'intercity-bus/select-date', component: IntercityBusSelectDateComponent },
  { path: 'intercity-bus/select-time', component: IntercityBusSelectTimeComponent },
  { path: 'intercity-bus/select-stop', component: IntercityBusSelectStopComponent },
];
