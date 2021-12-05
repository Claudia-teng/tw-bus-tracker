import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BusRoute, KeyboardBtns, RouteDetail } from 'src/app/model';
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
    let isPC = window.matchMedia('(min-width: 1025px)');
    if (isPC.matches) return;
    if (this.inputFocus) {
      setTimeout(() => this.inputFocus = false, 1000);
      return;
    }
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
  public busResult: Array<RouteDetail>;
  public loading: boolean;
  public inputFocus: boolean;
  public favList: Array<RouteDetail>;

  public navigateToIndex(): void {
    this.router.navigate([''])
  }

  public onInputFocus(): void {
    this.searchMode = true;
    this.inputFocus = true;
  }

  public onSelectCity(city: KeyboardBtns): void {
    this.selectedCity = city;
  }

  public onSetSearchCity(): void {
    this.searchInput = ''
    this.keyboardMode="number";
    if (!this.selectedCity) return;
    this.loading = true;
    this.displaySelectCity = this.selectedCity.label
    this.cityBusService.getBusByCity(this.selectedCity.value).subscribe(res => {
      setTimeout(() => this.loading = false, 800);
      this.busResult = [];
      res.forEach(route => {
        this.busResult.push({
          city: route.City,
          name: route.RouteName.Zh_tw,
          start: route.DepartureStopNameZh,
          end: route.DestinationStopNameZh
        })
      });
      this.checkFavList();
    });
  }

  public onSearch(input?: string, type?: string): void {
    this.loading = true;
    if (type === 'others') this.searchInput = ''
    if (input) this.searchInput += input;
    // console.log('this.searchInput', this.searchInput)
    this.cityBusService.getBusByCity(this.selectedCity.value, this.searchInput).subscribe(res => {
      setTimeout(() => this.loading = false, 800);
      this.busResult = [];
      res.forEach(route => {
        this.busResult.push({
          city: route.City,
          name: route.RouteName.Zh_tw,
          start: route.DepartureStopNameZh,
          end: route.DestinationStopNameZh
        })
      })
      this.checkFavList();
    });
  }

  public checkFavList(): void {
    this.favList = JSON.parse(localStorage.getItem('favList')) ?? [];
    this.busResult.forEach(route => {
      if (this.favList.some(fav => fav.city === route.city && fav.name === route.name)) {
        route.isFav = true;
      } else {
        route.isFav = false;
      }
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
    this.onSearch();
  }

  public onDeleteSingle(): void {
    this.searchInput = this.searchInput.slice(0, -1);
    this.onSearch();
  }

  public editFavList(bus: RouteDetail): void {
    if (!this.favList) this.favList = [];

    if (bus.isFav) {
      let index = this.favList.findIndex(fav => fav.city === bus.city && fav.name === bus.name);
      this.favList.splice(index, 1);
    } else {
      this.favList.push({
        city: bus.city,
        name: bus.name,
        start: bus.start,
        end: bus.end
      });
    }

    localStorage.setItem('favList', JSON.stringify(this.favList));
    this.checkFavList();
  }
}