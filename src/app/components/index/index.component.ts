import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent {

  constructor(private router: Router) {}

  public navigateTo(page: string): void {
    switch (page) {
      case 'city-bus':
        this.router.navigate(['city-bus/search']);
        break;
      case 'nearby':
        this.router.navigate(['nearby/stop']);
        break;
      case 'my-fav':
        this.router.navigate(['my-fav']);
        break;
    }
  }
}
