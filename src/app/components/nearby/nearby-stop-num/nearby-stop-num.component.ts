import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusStop, RouteDetail } from 'src/app/model';

@Component({
  selector: 'nearby-stop-num',
  templateUrl: './nearby-stop-num.component.html',
  styleUrls: ['./nearby-stop-num.component.sass']
})
export class NearbyStopNumComponent {

  public stopName: Array<BusStop>;
  public routeResult: Array<RouteDetail>;
  public favList: Array<RouteDetail>;
  public loading: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.stopName = params.stopName;
        this.routeResult = JSON.parse(params.route);
        this.checkFavList();
        setTimeout(() => this.loading = false, 800);
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
        route: route.name
      }
    })
  }

  public checkFavList() : void {
    this.favList = JSON.parse(localStorage.getItem('favList')) ?? [];
    this.routeResult.forEach(route => {
      if (this.favList.some(fav => fav.city === route.city && fav.name === route.name)) {
        route.isFav = true;
      } else {
        route.isFav = false;
      }
    })
  }

  public editFavList(route: RouteDetail): void {
    if (!this.favList) this.favList = [];

    if (route.isFav) {
      let index = this.favList.indexOf(route);
      this.favList.splice(index, 1);
    } else {
      this.favList.push({
        city: route.city,
        name: route.name,
        start: route.start,
        end: route.end
      });
    }

    localStorage.setItem('favList', JSON.stringify(this.favList));
    this.checkFavList();
  }
}
