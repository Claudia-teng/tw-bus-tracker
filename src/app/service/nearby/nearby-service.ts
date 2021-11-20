// Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusRoute, BusStop, BusStopOfRoute } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class NearbyService {

  constructor(
    private http: HttpClient,
  ) { }

  public getNearByStop(stopLat: number, stopLng: number): Observable<Array<BusStop>>{
    return this.http.get<Array<BusStop>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$spatialFilter=nearby(${stopLat}, ${stopLng}, 100)&$format=JSON`);
  }

  public getRouteByLocation(stopLat: number, stopLng: number): Observable<Array<BusRoute>>{
    return this.http.get<Array<BusRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/NearBy?$spatialFilter=nearby(${stopLat}, ${stopLng}, 100)&$format=JSON`);
  }

}
