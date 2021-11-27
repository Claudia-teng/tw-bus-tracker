import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardBtns } from 'src/app/model';
import { cityBusCity } from '../keyboard-list/keyboard-list';

@Component({
  selector: 'intercity-bus-start-end-search',
  templateUrl: './intercity-bus-start-end-search.component.html',
  styleUrls: ['./intercity-bus-start-end-search.component.sass']
})
export class IntercityBusStartEndSearchComponent {

  public keyboardCityBtns: Array<KeyboardBtns> = cityBusCity;
  public searchMode: boolean = true;

  constructor(private router: Router) {}

  public navigateToNormalSearch(): void {
    this.router.navigate(['intercity-bus/normal-search']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToPriceQuery(): void {
    this.router.navigate(['intercity-bus/price-query']);
  }

  public setSearchCity(): void {
    this.searchMode = false;
  }

}