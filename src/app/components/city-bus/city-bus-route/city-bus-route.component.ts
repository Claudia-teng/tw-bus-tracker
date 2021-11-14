import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusN1EstimateTime } from 'src/app/models';
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
  public stopResult: Array<BusN1EstimateTime>;

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.city = params.city,
        this.routeName = params.route;
      }
    );

    this.cityBusService.getEstimatedTimeByRoute(this.city, this.routeName).subscribe(res => {
      this.stopResult = res;
    })
  }

  public navigateTo(page: string): void {
    switch(page) {
      case 'index':
        this.router.navigate(['']);
        break;
      // change to back page
      case 'search':
        this.router.navigate(['/city-bus/search']);
        break;
      case 'map':
        this.router.navigate(['/city-bus/map']);
        break;
    }
  }

  public navigateToMap(): void {
    this.router.navigate(['city-bus/map'])
  }

  public onSetDirection(direction: string): void {
    this.isReturnDirection = direction === 'go' ? false : true;

  }
}