import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusStop } from 'src/app/models';
import { NearbyService } from 'src/app/service';

@Component({
  selector: 'nearby-stop',
  templateUrl: './nearby-stop.component.html',
  styleUrls: ['./nearby-stop.component.sass']
})
export class NearbyStopComponent {

  public stopLat: number;
  public stopLng: number;
  public stopResult: Array<BusStop>;
  public loading: boolean;


  constructor(private router: Router,
              private nearbyService: NearbyService) {}

  ngOnInit() {
    this.getUserLocation();
  }

  public getUserLocation() {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.stopLat = position.coords.latitude;
        this.stopLng = position.coords.longitude;
        this.findNearbyStop();
      });
    } 
  }

  public findNearbyStop(): void {
    this.nearbyService.getNearByStop(this.stopLat, this.stopLng).subscribe(res => {
      this.loading = false;
      this.stopResult = res;
      this.findRouteByStop()
    })
  }

  public findRouteByStop(): void {
    this.stopResult.forEach(stop => {
      this.nearbyService.getRouteByLocation(stop.StopPosition.PositionLat, stop.StopPosition.PositionLon).subscribe(res => {
        let allRoute: Array<string> = [];
        res.forEach(singleStop => {
          allRoute.push(singleStop.RouteName.Zh_tw);
          if (!stop.Route) stop.Route = [];
          stop.Route.push({
            city: singleStop.City, 
            name: singleStop.RouteName.Zh_tw,
            start: singleStop.DepartureStopNameZh,
            end: singleStop.DestinationStopNameZh});
        });
        stop.AllRoute = allRoute.join(', ');
      });
    })
    console.log('this.stopResult', this.stopResult)
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToNum(stop: BusStop): void {
    console.log('stop.Route', stop.Route)
    this.router.navigate(['nearby/stop-num'], {queryParams: 
      {
        stopName: stop.StopName.Zh_tw,
        route: JSON.stringify(stop.Route)
      }
    });
  }
}
