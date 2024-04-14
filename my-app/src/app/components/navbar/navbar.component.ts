import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
