import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StopLocation } from 'src/app/models';
declare var google: any

@Component({
  selector: 'city-bus-map',
  templateUrl: './city-bus-map.component.html',
  styleUrls: ['./city-bus-map.component.sass']
})
export class CityBusMapComponent {

  constructor(private router: Router,
              private route: ActivatedRoute,) {}
  public options: any;
  public overlays: any[] = [];
  public isReturnDirection: boolean = false;
  public goLocationInfo: Array<StopLocation>;
  public returnLocationInfo: Array<StopLocation>;

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.goLocationInfo = JSON.parse(params.goLocationInfo);
        this.returnLocationInfo = JSON.parse(params.returnLocationInfo);
      }
    );

    this.options = {
      center: {lat: this.goLocationInfo[0].lat, lng: this.goLocationInfo[0].lng},
      zoom: 12,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    };
    this.initOverlays();
  }

  public initOverlays(): void {
    if (!this.overlays||!this.overlays.length) {
      this.goLocationInfo.forEach(location => {
        this.overlays.push(new google.maps.Marker({position: {lat: location.lat, lng: location.lng}, title: location.name}))
      });
    }
}

  public navigateToRoute(): void {
    this.router.navigate(['city-bus/search']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onSetDirection(direction: string): void {
    this.isReturnDirection = direction === 'go' ? false : true;
    this.overlays = [];
    if (direction === 'go') {
      this.goLocationInfo.forEach(location => {
        this.overlays.push(new google.maps.Marker({position: {lat: location.lat, lng: location.lng}, title: location.name}))
      });
    } else {
      this.returnLocationInfo.forEach(location => {
        this.overlays.push(new google.maps.Marker({position: {lat: location.lat, lng: location.lng}, title: location.name}))
      });
    }
  }
}