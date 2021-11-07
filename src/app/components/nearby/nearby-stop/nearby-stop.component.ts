import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nearby-stop',
  templateUrl: './nearby-stop.component.html',
  styleUrls: ['./nearby-stop.component.sass']
})
export class NearbyStopComponent {

  constructor(private router: Router) {}

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToNum(): void {
    this.router.navigate(['nearby/stop-num']);
  }


}
