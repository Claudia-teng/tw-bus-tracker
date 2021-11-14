import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any

@Component({
  selector: 'city-bus-map',
  templateUrl: './city-bus-map.component.html',
  styleUrls: ['./city-bus-map.component.sass']
})
export class CityBusMapComponent {

  constructor(private router: Router) {}
  options: any;
  overlays: any[];

  ngOnInit() {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
    this.initOverlays();
  }

  initOverlays() {
    if (!this.overlays||!this.overlays.length) {
        this.overlays = [
            new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
            new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
            new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
            new google.maps.Polygon({paths: [
                {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
            ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
            }),
            new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
            new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
        ];
    }
}

  public isReturnDirection: boolean = false;

  public navigateToRoute(): void {
    this.router.navigate(['city-bus/route']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onSetDirection(direction: string): void {
    this.isReturnDirection = direction === 'go' ? false : true;
  }
}