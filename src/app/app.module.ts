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
import { CityBusMapComponent } from './components/city-bus/city-bus-map/city-bus-map.component';
import { MyFavComponent } from './components/my-fav/my-fav.component';
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
    MyFavComponent
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
