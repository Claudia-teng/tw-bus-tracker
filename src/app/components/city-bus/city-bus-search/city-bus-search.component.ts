import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardBtns } from 'src/app/models';
import { cityBusNumber, cityBusCity, cityBusOthers } from './keyboard-list/keyboard-list';


@Component({
  selector: 'city-bus-search',
  templateUrl: './city-bus-search.component.html',
  styleUrls: ['./city-bus-search.component.sass']
})
export class CityBusSearchComponent {

  constructor(private router: Router) {}

  public keyboardNumBtns: Array<KeyboardBtns> = cityBusNumber;
  public keyboardCityBtns: Array<KeyboardBtns> = cityBusCity;
  public keyboardOthersBtns: Array<KeyboardBtns> = cityBusOthers;
  public keyboardMode: string = 'number';
  public searchMode: boolean = false;

  public navigateToIndex(): void {
    this.router.navigate([''])
  }

  public setSearchCity(): void {
    this.keyboardMode="number"
  }

  public onSearch(): void {

  }

  public navigateToRoute(): void {
    this.router.navigate(['city-bus/route'])
  }
}