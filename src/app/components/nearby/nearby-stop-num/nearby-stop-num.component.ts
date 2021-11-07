import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nearby-stop-num',
  templateUrl: './nearby-stop-num.component.html',
  styleUrls: ['./nearby-stop-num.component.sass']
})
export class NearbyStopNumComponent {

  constructor(private router: Router) {}

  public navigateToStop(): void {
    this.router.navigate(['nearby/stop']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToRoute(): void {
    this.router.navigate(['city-bus/route'])
  }

}
