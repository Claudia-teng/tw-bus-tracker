import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BusRoute, KeyboardBtns } from 'src/app/models';
import { CityBusService } from 'src/app/service';

import { cityBusNumber, cityBusCity, cityBusOthers } from './keyboard-list/keyboard-list';

@Component({
  selector: 'city-bus-search',
  templateUrl: './city-bus-search.component.html',
  styleUrls: ['./city-bus-search.component.sass']
})
export class CityBusSearchComponent {
  @ViewChild('search') searchElement: ElementRef;
  
  @HostListener('window:scroll', []) onScrollEvent(){
    this.searchMode = false;
    this.searchElement.nativeElement.blur();
  } 

  constructor(private router: Router,
              private cityBusService: CityBusService) {}

  public keyboardNumBtns: Array<KeyboardBtns> = cityBusNumber;
  public keyboardCityBtns: Array<KeyboardBtns> = cityBusCity;
  public keyboardOthersBtns: Array<KeyboardBtns> = cityBusOthers;
  public keyboardMode: string = 'number';
  public searchMode: boolean = true;

  public searchInput: string = '';
  public selectedCity: KeyboardBtns;
  public displaySelectCity: string;
  public busResult: Array<BusRoute>;
  public loading: boolean;

  public navigateToIndex(): void {
    this.router.navigate([''])
  }

  public onInputFocus(): void {
    this.searchMode = true;
  }

  public onSelectCity(city: KeyboardBtns): void {
    this.selectedCity = city;
  }

  public onSetSearchCity(): void {
    this.loading = true;
    this.keyboardMode="number";
    this.displaySelectCity = this.selectedCity.label
    this.cityBusService.getBusByCity(this.selectedCity.value).subscribe(res => {
      this.busResult = res;
      setTimeout(() => this.loading = false, 800);
    });
  }

  public onSearch(input: string): void {
    this.loading = true;
    this.searchInput += input;
    this.cityBusService.getBusByCity(this.selectedCity.value).subscribe(res => {
      this.loading = false;
      this.busResult = res;
    });
  }

  public navigateToRoute(route: string): void {
    this.router.navigate(['city-bus/route'], 
      { queryParams: 
        {
          city: this.selectedCity.value,
          route: route
        }
      }
    )
  }

  public onClearInput(): void {
    this.searchInput = '';
  }

  public onDeleteSingle(): void {
    this.searchInput = this.searchInput.slice(0, -1); 
  }
}