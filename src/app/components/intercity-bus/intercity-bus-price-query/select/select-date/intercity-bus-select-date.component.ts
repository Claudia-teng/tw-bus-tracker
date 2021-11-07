import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'intercity-bus-select-date',
  templateUrl: './intercity-bus-select-date.component.html',
  styleUrls: ['./intercity-bus-select-date.component.sass']
})
export class IntercityBusSelectDateComponent {

  constructor(private router: Router) {}

  public onSetDate(): void {
    this.router.navigate(['intercity-bus/price-query']);
  }

}