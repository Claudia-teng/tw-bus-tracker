import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { BusN1EstimateTime, BusStopOfRoute, Stop, StopLocation } from 'src/app/models';
import { CityBusService } from 'src/app/service';

@Component({
  selector: 'city-bus-route',
  templateUrl: './city-bus-route.component.html',
  styleUrls: ['./city-bus-route.component.sass']
})
export class CityBusRouteComponent {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cityBusService: CityBusService) {}

  public isReturnDirection: boolean = false;
  public city: string;
  public routeName: string;
  public pageUrl: string
  public goDestination: string;
  public returnDestination: string;
  public stopResult: Array<Stop>;
  public estimateTimeResponse: Array<BusN1EstimateTime>;
  public secondCountdown: number = 0;
  public timerId: ReturnType<typeof setInterval>;

  public loading: boolean;

  // public stopResponse: Array<BusStopOfRoute>;
  public stopResponse: Array<BusStopOfRoute>;
  public subscription: Subscription;

  public goLocationInfo: Array<StopLocation> = [];
  public returnLocationInfo: Array<StopLocation> = [];

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.loading = true;
        this.city = params.city,
        this.routeName = params.route;
        this.pageUrl = params.pageUrl
      }
    );
    

    this.cityBusService.getStopByRoute(this.city, this.routeName).subscribe(res => {
      this.loading = true;
      this.stopResponse = res;
      this.stopResult = this.stopResponse[0].Stops;
      this.goDestination = res[0].Stops[res[0].Stops.length-1].StopName.Zh_tw;
      this.returnDestination = res[0].Stops[0].StopName.Zh_tw;
      this.setLocationInfo();
      this.setEstimatedTimeInfo();
    })
  }
  
  private setEstimatedTimeInfo(changeDirection?:boolean): void {
    this.cityBusService.getEstimatedTimeByRoute(this.city, this.routeName).subscribe(res => {
      setTimeout(() => this.loading = false, 800);
      if (!changeDirection) this.handleCountdown();
      this.estimateTimeResponse = res;
      this.bindInfoByDirection(this.stopResult);
      // console.log('this.stopResult', this.stopResult);
    })
  }

  private bindInfoByDirection(stopResult): void {
    this.estimateTimeResponse.forEach(busN1EstimateTime => {
      stopResult.forEach((stop) => {
        if (stop.StopUID === busN1EstimateTime.StopUID) {
          // EstimateTime
          if (busN1EstimateTime.EstimateTime == null) {
            stop.EstimatedTime = null;
          } else {
            stop.EstimatedTime = Math.floor(busN1EstimateTime.EstimateTime / 60);
          }
          // Status
          if (stop.EstimatedTime === null) {
            stop.Status = 'no-depart';
          } else if (stop.EstimatedTime === 0) {
            stop.Status = 'coming';
          } else {
            stop.Status = 'waiting';
          }
          // plateNumb
          stop.PlateNumb = busN1EstimateTime.PlateNumb;
        }
      });
    })
  }

  private handleCountdown(): void {
    this.timerId = setInterval(() => {
      if (this.secondCountdown < 10) {
          this.secondCountdown++;
      } else {
        this.secondCountdown = 0;
        clearInterval(this.timerId);
        this.setEstimatedTimeInfo();
      }
    }, 1000)
  }

  public navigateTo(page: string): void {
    switch(page) {
      case 'index':
        this.router.navigate(['']);
        break;
      // change to back page
      case 'back':
        this.router.navigate([this.pageUrl]);
        break;
      case 'map':
        this.router.navigate(['/city-bus/map'], { queryParams: 
          {
            goLocationInfo: JSON.stringify(this.goLocationInfo),
            returnLocationInfo: JSON.stringify(this.returnLocationInfo),
          }
        });
        break;
    }
  }

  private setLocationInfo(): void {
    this.stopResponse[0].Stops.forEach(stop => {
      let locationInfo: StopLocation = {
        name: stop.StopName.Zh_tw,
        lat: stop.StopPosition.PositionLat,
        lng: stop.StopPosition.PositionLon
      }
      this.goLocationInfo.push(locationInfo);
    });

    this.stopResponse[1].Stops.forEach(stop => {
      let locationInfo: StopLocation = {
        name: stop.StopName.Zh_tw,
        lat: stop.StopPosition.PositionLat,
        lng: stop.StopPosition.PositionLon
      }
      this.returnLocationInfo.push(locationInfo);
    })
  }

  public onChangeDirection(direction: string): void {
    if (direction === 'go') {
      this.stopResult = this.stopResponse[0].Stops;
      this.isReturnDirection = false;
      this.bindInfoByDirection(this.stopResult);
    } else {
      this.stopResult = this.stopResponse[1].Stops;
      this.isReturnDirection = true;
      this.bindInfoByDirection(this.stopResult);
    } 
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

}