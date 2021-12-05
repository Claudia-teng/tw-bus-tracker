import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusStop, RouteDetail } from 'src/app/model';
import { NearbyService } from 'src/app/service';

@Component({
  selector: 'my-fav',
  templateUrl: './my-fav.component.html',
  styleUrls: ['./my-fav.component.sass']
})
export class MyFavComponent {

  public noFavRoutes: boolean = false;
  public favRoutes: Array<RouteDetail>;

  constructor(private router: Router,
              private nearbyService: NearbyService) {}

  ngOnInit() {
    this.favRoutes = JSON.parse(localStorage.getItem('favList')) ?? [];
    if (this.favRoutes.length === 0) this.noFavRoutes = true;
    console.log('this.favRoutes', this.favRoutes)
  }

  public navigateToIndex(): void {
    this.router.navigate([''])
  }

  public navigateToSearch(): void {
    this.router.navigate(['city-bus/search']);
  }

  public navigateToRoute(route: RouteDetail): void {
    this.router.navigate(['city-bus/route'], {queryParams:
      {
        city: route.city,
        route: route.name
      }
    })
  }

  public removeFromList(route: RouteDetail) : void {
    let index = this.favRoutes.indexOf(route);
    this.favRoutes.splice(index, 1);
    localStorage.setItem('favList', JSON.stringify(this.favRoutes));
  }

  
}
