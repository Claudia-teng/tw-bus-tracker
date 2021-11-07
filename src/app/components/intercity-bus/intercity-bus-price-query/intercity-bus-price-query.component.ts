import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'intercity-bus-price-query',
  templateUrl: './intercity-bus-price-query.component.html',
  styleUrls: ['./intercity-bus-price-query.component.sass']
})
export class IntercityBusPriceQueryComponent {

  constructor(private router: Router) {}

  public navigateToStartEndSearch(): void {
    this.router.navigate(['intercity-bus/start-end-search']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToTimeTable(): void {
    this.router.navigate(['intercity-bus/time-table']);
  }

  public navigatToSelect(page: string): void {
    this.router.navigate([`intercity-bus/select-${page}`]);
  }

}