import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'intercity-bus-time-table',
  templateUrl: './intercity-bus-time-table.component.html',
  styleUrls: ['./intercity-bus-time-table.component.sass']
})
export class IntercityBusTimeTableComponent {

  constructor(private router: Router) {}

  public navigateToPriceQuery(): void {
    this.router.navigate(['intercity-bus/price-query']);
  }

}