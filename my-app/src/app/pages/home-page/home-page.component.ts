import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { MapComponent } from '../../components/map/map.component';
import { SessionService } from '../../services/session.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { GoogleLogInComponent } from '../../components/google-log-in/google-log-in.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    NavbarComponent,
    GoogleLogInComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  profile: any;
  locationData: any;

  constructor(
    private authService: AuthGoogleService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService
  ) {}  

  ngOnInit(): void {
    this.authService.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        this.sendSessionData();
      }
      this.cdr.detectChanges();
    });
  }

  onLocationFound(latlng: any) {
    this.locationData = latlng;
    console.log('Location:', this.locationData.lat);
    this.sendSessionData();
  }

  sendSessionData() {
    if (this.profile && this.locationData) {
      
      const sessionData = {
        email: this.profile.email,
        lat: this.locationData.lat,
        lng: this.locationData.lng
      };
      console.log('Session data:', sessionData);
      this.sessionService.createSession(sessionData).subscribe({
        next: (res: any) => console.log('Session created successfully', res),
        error: (err: any) => console.error('Error creating session', err)
      });
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
