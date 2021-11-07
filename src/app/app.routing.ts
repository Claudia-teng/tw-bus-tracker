import { Routes } from '@angular/router';
import { CityBusRouteComponent } from './components/city-bus/city-bus-route/city-bus-route.component';
import { CityBusSearchComponent } from './components/city-bus/city-bus-search/city-bus-search.component';
import { IndexComponent } from './components/index/index.component';
import { NearbyStopNumComponent } from './components/nearby/nearby-stop-num/nearby-stop-num.component';
import { NearbyStopComponent } from './components/nearby/nearby-stop/nearby-stop.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'city-bus/search', component: CityBusSearchComponent },
  { path: 'city-bus/route', component: CityBusRouteComponent },
  { path: 'nearby/stop', component: NearbyStopComponent },
  { path: 'nearby/stop-num', component: NearbyStopNumComponent }
];
