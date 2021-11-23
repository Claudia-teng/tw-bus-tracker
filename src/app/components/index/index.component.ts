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
    this.playAudio();
    
    switch (page) {
      case 'city-bus':
        this.router.navigate(['city-bus/search']);
        break;
      case 'nearby':
        this.router.navigate(['nearby/stop']);
        break;
      case 'intercity-bus':
        this.router.navigate(['intercity-bus/normal-search']);
        break;
    }
  }

  public playAudio(): void {
    let audio = new Audio();
    audio.src = "../../../../assets/bus.mp3";
    audio.crossOrigin = 'anonymous';
    audio.load();
    audio.play();
  }
}
