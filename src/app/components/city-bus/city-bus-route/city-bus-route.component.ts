import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'city-bus-route',
  templateUrl: './city-bus-route.component.html',
  styleUrls: ['./city-bus-route.component.sass']
})
export class CityBusRouteComponent {

  constructor(private router: Router) {}


  public navigateToSearch(): void {
    this.router.navigate(['/city-bus/search']);
  }

  public navigateToMap(): void {

  }
}