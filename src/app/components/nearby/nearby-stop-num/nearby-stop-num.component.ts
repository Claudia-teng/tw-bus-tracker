import { Component, PACKAGE_ROOT_URL } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusStop, RouteDetail } from 'src/app/models';

@Component({
  selector: 'nearby-stop-num',
  templateUrl: './nearby-stop-num.component.html',
  styleUrls: ['./nearby-stop-num.component.sass']
})
export class NearbyStopNumComponent {

  public stopName: Array<BusStop>;
  public routeResult: Array<RouteDetail>;
  public loading: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.stopName = params.stopName;
        this.routeResult = JSON.parse(params.route);
        setTimeout(() => this.loading = false, 800)
      }
    );
  }

  public navigateToStop(): void {
    this.router.navigate(['nearby/stop']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToRoute(route: RouteDetail): void {
    this.router.navigate(['city-bus/route'], {queryParams:
      {
        city: route.city,
        route: route.name ,
        pageUrl: '/nearby/stop'
      }
    })
  }
}
