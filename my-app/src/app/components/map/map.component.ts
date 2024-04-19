import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { DetailsComponent } from '../../pages/details/details.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [DetailsComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: any;
  city: string = '';
  weatherInfo: string = '';
  weatherIcon: string = '';
  weatherDescription: string = '';
  showAppDetails: boolean = false;


  @Output() locationFound = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 20 });

    this.map.on('locationfound', this.onLocationFound.bind(this));
    this.map.on('locationerror', this.onLocationError.bind(this));

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            this.city = data.address.city || data.address.town || data.address.village || 'Unknown';

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d9c5f087a7ee7aea88d9c5d9e1f9a9f6&units=metric&lang=fr`;

            fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                if (data.cod === 200) {
                  this.weatherInfo = `il fait ${data.main.temp}°C et le temps est`;
                  this.weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                  this.weatherDescription = data.weather[0].description;
                } else {
                  this.weatherInfo = 'Un problème est survenu.';
                }
              })
              .catch(error => {
                console.error('Error:', error);
                this.weatherInfo = 'An error occurred while fetching weather data.';
              });
          })
          .catch(error => {
            console.error('Error fetching city: ' + error);
          });
      });
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  }

  toggleDetails(): void {
    this.showAppDetails = !this.showAppDetails;
  }

  onLocationFound(e: any): void {
    if (this.map) {
      const radius = Math.round(e.accuracy);

      if (radius < 100) {
      L.marker(e.latlng).addTo(this.map)
      } else {
        L.marker(e.latlng).addTo(this.map)
          .bindPopup("vous êtes à environ " + radius + " metres de ce point, désolé de l'imprécision.").openPopup();
      }

      L.circle(e.latlng, { radius: radius }).addTo(this.map);

    }
  }

  onLocationError(e: any): void {
    alert(e.message);
  }
}