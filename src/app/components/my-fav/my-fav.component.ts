import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteDetail } from 'src/app/model';

@Component({
  selector: 'my-fav',
  templateUrl: './my-fav.component.html',
  styleUrls: ['./my-fav.component.sass']
})
export class MyFavComponent {

  public noFavList: boolean = false;
  public favList: Array<RouteDetail>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.favList = JSON.parse(localStorage.getItem('favList')) ?? [];
    if (this.favList.length === 0) this.noFavList = true;
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
    let index = this.favList.indexOf(route);
    this.favList.splice(index, 1);
    localStorage.setItem('favList', JSON.stringify(this.favList));
  }
}
