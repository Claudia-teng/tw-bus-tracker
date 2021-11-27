import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusStop } from 'src/app/model';
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
  public showError: boolean = false;

  constructor(private router: Router,
              private nearbyService: NearbyService) {}

  ngOnInit() {
    this.getUserLocation();
  }

  public getUserLocation() {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.stopLat = position.coords.latitude;
        this.stopLng = position.coords.longitude;
        this.findNearbyStop();
      }, (err) => {
        this.loading = false;
        this.showError = true;
      })
    } 
  }

  public findNearbyStop(): void {
    this.nearbyService.getNearByStop(this.stopLat, this.stopLng).subscribe(res => {
      this.stopResult = res;
      this.findRouteByStop()
    })
  }

  public findRouteByStop(): void {
    this.stopResult = this.stopResult.filter((route, index, self) =>
    index === self.findIndex((t) => (
      t.StationID === route.StationID
    ))
  )
    this.stopResult.forEach(stop => {
      if (!stop.City) return;
      this.nearbyService.getRouteByStop(stop.City, stop.StationID).subscribe(res => {
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
        this.loading = false;
      });
    })
    // console.log('this.stopResult', this.stopResult)
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToNum(stop: BusStop): void {
    this.router.navigate(['nearby/stop-num'], {queryParams: 
      {
        stopName: stop.StopName.Zh_tw,
        route: JSON.stringify(stop.Route)
      }
    });
  }
}
