// Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusN1EstimateTime, BusRoute, BusStopOfRoute } from 'src/app/model';

@Injectable({ providedIn: 'root' })
export class CityBusService {

  constructor(
    private http: HttpClient,
  ) { }
  
  public getBusByCity(city: string, searchInput?: string): Observable<Array<BusRoute>> {
    if (!searchInput) {
      return this.http.get<Array<BusRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}`);
    } else {
      return this.http.get<Array<BusRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$filter=contains(RouteName/Zh_tw,'${searchInput}')&$format=JSON`)
    }
  }

  public getEstimatedTimeByRoute(city: string, route: string): Observable<Array<BusN1EstimateTime>>{
    return this.http.get<Array<BusN1EstimateTime>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${route}`);
  }

  public getStopByRoute(city: string, route: string): Observable<Array<BusStopOfRoute>>{
    return this.http.get<Array<BusStopOfRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${city}/${route}`);
  }
}
