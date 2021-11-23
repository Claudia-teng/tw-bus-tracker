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
    return this.http.get<Array<BusStop>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$spatialFilter=nearby(${stopLat}, ${stopLng}, 1000)&$format=JSON`);
  }

  public getRouteByStop(city: string, stationId: string): Observable<Array<BusRoute>>{
    return this.http.get<Array<BusRoute>>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/PassThrough/Station/${stationId}`);
  }

}
