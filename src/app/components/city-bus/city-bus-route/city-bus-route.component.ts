import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'city-bus-route',
  templateUrl: './city-bus-route.component.html',
  styleUrls: ['./city-bus-route.component.sass']
})
export class CityBusRouteComponent {

  constructor(private router: Router) {}


  public navigateTo(page: string): void {
    switch(page) {
      case 'index':
        this.router.navigate(['']);
        break;
      case 'search':
        this.router.navigate(['/city-bus/search']);
        break;
      case 'map':
        this.router.navigate(['/city-bus/map']);
        break;
    }
    
  }
}