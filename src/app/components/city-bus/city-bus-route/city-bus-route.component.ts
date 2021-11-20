import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { BusStopOfRoute, Stop } from 'src/app/models';
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
  public secondCountdown: number = 0;
  public timerId: ReturnType<typeof setInterval>;

  public loading: boolean;

  // public stopResponse: Array<BusStopOfRoute>;
  public stopResponse: Array<BusStopOfRoute>;
  public subscription: Subscription;

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
      this.setEstimatedTimeInfo()
    })
  }
  
  private setEstimatedTimeInfo(changeDirection?:boolean): void {
    this.cityBusService.getEstimatedTimeByRoute(this.city, this.routeName).subscribe(res => {
      setTimeout(() => {
        this.loading = false;
        if (!changeDirection) this.handleCountdown();
      }, 800);
      res.forEach(busN1EstimateTime => {
        this.stopResult.forEach((stop) => {
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
      console.log('this.stopResult', this.stopResult);
    })
  }

  private handleCountdown(): void {
    this.timerId = setInterval(() => {
      if (this.secondCountdown < 10) {
          this.secondCountdown++;
      } else {
        this.secondCountdown = 0;
        clearInterval(this.timerId);
        this.handleCountdown();
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
        this.router.navigate(['/city-bus/map']);
        break;
    }
  }

  public navigateToMap(): void {
    this.router.navigate(['city-bus/map'])
  }

  public onChangeDirection(direction: string): void {
    if (direction === 'go') {
      this.stopResult = this.stopResponse[0].Stops;
      this.isReturnDirection = false;
      this.setEstimatedTimeInfo(true);
    } else {
      this.stopResult = this.stopResponse[1].Stops;
      this.isReturnDirection = true;
      this.setEstimatedTimeInfo(true);
    } 
  }
}