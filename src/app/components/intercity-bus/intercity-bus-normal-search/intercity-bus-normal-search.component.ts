import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardBtns } from 'src/app/models';
import { cityBusNumber, cityBusCity} from '../keyboard-list/keyboard-list';


@Component({
  selector: 'intercity-bus-normal-search',
  templateUrl: './intercity-bus-normal-search.component.html',
  styleUrls: ['./intercity-bus-normal-search.component.sass']
})
export class IntercityBusNormalSearchComponent {

  constructor(private router: Router) {}

  public keyboardNumBtns: Array<KeyboardBtns> = cityBusNumber;
  public keyboardCityBtns: Array<KeyboardBtns> = cityBusCity;
  public keyboardMode: string = 'number';
  public searchMode: boolean = true;

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public navigateToStartEndSearch(): void {
    this.router.navigate(['intercity-bus/start-end-search']);
  }

  public navigateToPriceQuery(): void {
    this.router.navigate(['intercity-bus/price-query']);
  }

  public setSearchCity(): void {
    this.keyboardMode = "number";
  }

  public onSearch(): void {

  }
}