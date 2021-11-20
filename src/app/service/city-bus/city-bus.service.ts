// Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusN1EstimateTime, BusRoute, BusStopOfRoute } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class CityBusService {

  constructor(
    private http: HttpClient,
  ) { }

  public getBusByCity(city: string): Observable<Array<BusRoute>> {
    return this.http.get<Array<BusRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}`);
  }

  public getEstimatedTimeByRoute(city: string, route: string): Observable<Array<BusN1EstimateTime>>{
    return this.http.get<Array<BusN1EstimateTime>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${route}`);
  }

  public getStopByRoute(city: string, route: string): Observable<Array<BusStopOfRoute>>{
    return this.http.get<Array<BusStopOfRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${city}/${route}`);
  }
}
