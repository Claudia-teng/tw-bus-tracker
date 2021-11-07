import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'intercity-bus-select-stop',
  templateUrl: './intercity-bus-select-stop.component.html',
  styleUrls: ['./intercity-bus-select-stop.component.sass']
})
export class IntercityBusSelectStopComponent {

  constructor(private router: Router) {}

  public onSetStop(): void {
    this.router.navigate(['intercity-bus/price-query']);
  }

}