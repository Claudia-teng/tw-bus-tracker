import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'intercity-bus-select-time',
  templateUrl: './intercity-bus-select-time.component.html',
  styleUrls: ['./intercity-bus-select-time.component.sass']
})
export class IntercityBusSelectTimeComponent {

  constructor(private router: Router) {}

  public onSetTime(): void {
    this.router.navigate(['intercity-bus/price-query'])
  }

}