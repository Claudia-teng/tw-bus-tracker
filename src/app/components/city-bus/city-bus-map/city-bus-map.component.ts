import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusStopOfRoute, Stop, StopLocation } from 'src/app/models';
import { CityBusService } from 'src/app/service';
declare var google: any

@Component({
  selector: 'city-bus-map',
  templateUrl: './city-bus-map.component.html',
  styleUrls: ['./city-bus-map.component.sass']
})
export class CityBusMapComponent {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cityBusService: CityBusService) {}

  public overlays: any[] = [];
  public infoWindow: any = [];
  public isReturnDirection: boolean = false;
  public goLocationInfo: Array<StopLocation> = [];
  public returnLocationInfo: Array<StopLocation> = [];

  public city: string;
  public routeName: string;
  public goDestination: string;
  public returnDestination: string;
  public firstLat: Number
  public firstLng: number;
  public stopResponse: Array<BusStopOfRoute> = [];
  public stopResult: Array<Stop> = [];

  public options: any = {
    center: { lat: 0, lng: 0},
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
;

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.city = params.city;
        this.routeName = params.routeName;
        this.goDestination = params.start;
        this.returnDestination = params.end;
        this.firstLat = +params.firstLat;
        this.firstLng = +params.firstLng;
      }
    );

    this.infoWindow = new google.maps.InfoWindow();
    this.options.center = { lat: this.firstLat, lng: this.firstLng}

    this.cityBusService.getStopByRoute(this.city, this.routeName).subscribe(res => {
      this.stopResponse = res;
      this.stopResult = this.stopResponse[0].Stops;
      this.stopResponse[0].Stops.forEach(stop => {
        let locationInfo: StopLocation = {
          name: stop.StopName.Zh_tw,
          lat: stop.StopPosition.PositionLat,
          lng: stop.StopPosition.PositionLon
        }
        this.goLocationInfo.push(locationInfo);
      });
      // can be only one way
      if (this.stopResponse[1]) {
        this.stopResponse[1].Stops.forEach(stop => {
          let locationInfo: StopLocation = {
            name: stop.StopName.Zh_tw,
            lat: stop.StopPosition.PositionLat,
            lng: stop.StopPosition.PositionLon
          }
          this.returnLocationInfo.push(locationInfo);
        });
      }
      this.initOverlays();
    })
  }

  public initOverlays(): void {

    if (!this.overlays||!this.overlays.length) {
      let polygonLocation = [];
      this.goLocationInfo.forEach(location => {
        this.overlays.push(new google.maps.Marker(
          { position: {lat: location.lat, lng: location.lng}, 
            title: location.name,
            icon: 'assets/map-marker.png'
          }));
        polygonLocation.push({lat: location.lat, lng: location.lng});
      });

      this.overlays.push(new google.maps.Polyline(
        { path: polygonLocation, 
          geodesic: true, 
          strokeColor: '#1CC8EE', 
          strokeOpacity: 1, 
          strokeWeight: 3 }));
    }
}

  public navigateToSearch(): void {
    this.router.navigate(['city-bus/search']);
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onSetDirection(direction: string): void {
    this.isReturnDirection = direction === 'go' ? false : true;
    this.overlays = [];
    let polygonLocation = [];
    if (direction === 'go') {
      this.goLocationInfo.forEach(location => {
        this.overlays.push(new google.maps.Marker(
          { position: {lat: location.lat, lng: location.lng}, 
            title: location.name,
            icon: 'assets/map-marker.png'}));
        polygonLocation.push({lat: location.lat, lng: location.lng});
      });
      this.overlays.push(new google.maps.Polyline(
        { path: polygonLocation, 
          geodesic: true, 
          strokeColor: '#1CC8EE', 
          strokeOpacity: 0.5, 
          strokeWeight: 2 }));
    } else {
      this.returnLocationInfo.forEach(location => {
        this.overlays.push(new google.maps.Marker(
          { position: {lat: location.lat, lng: location.lng}, 
            title: location.name,
            icon: 'assets/map-marker.png'}));
        polygonLocation.push({lat: location.lat, lng: location.lng});
      });
      this.overlays.push(new google.maps.Polyline(
        { path: polygonLocation, 
          geodesic: true, 
          strokeColor: '#1CC8EE', 
          strokeOpacity: 0.5, 
          strokeWeight: 2 }));
    }
  }

  public handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;
      if (isMarker) {
          let title = event.overlay.getTitle();
          this.infoWindow.setContent('' + title + '');
          this.infoWindow.open(event.map, event.overlay);
          event.map.setCenter(event.overlay.getPosition());
      }
  }
}