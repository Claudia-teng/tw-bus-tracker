import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardBtns } from 'src/app/models';
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

  constructor(private router: Router) {}

  public keyboardNumBtns: Array<KeyboardBtns> = cityBusNumber;
  public keyboardCityBtns: Array<KeyboardBtns> = cityBusCity;
  public keyboardOthersBtns: Array<KeyboardBtns> = cityBusOthers;
  public keyboardMode: string = 'number';
  public searchMode: boolean = true;

  public searchInput: string = '';
  public selectedCity: KeyboardBtns = { label: "台北市", value: "台北市"};

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
    this.keyboardMode="number";
    this.searchInput = '';
  }

  public onSearch(input: string): void {
    this.searchInput += input;
  }

  public navigateToRoute(): void {
    this.router.navigate(['city-bus/route'])
  }

  public onClearInput(): void {
    this.searchInput = '';
  }

  public onDeleteSingle(): void {
    this.searchInput = this.searchInput.slice(0, -1); 
  }
}