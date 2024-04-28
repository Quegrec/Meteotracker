import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';


@Component({
  selector: 'app-google-log-in',
  standalone: true,
  templateUrl: './google-log-in.component.html',
  styleUrl: './google-log-in.component.css'
})
export class GoogleLogInComponent implements OnInit{

  constructor(private authService: AuthGoogleService) {}

  ngOnInit(): void {
    this.launchAudio();
    }

    launchAudio(): void {
      const audio = new Audio('assets/kaamelott.mp3');
      audio.play();
    }

    signInWithGoogle() {
      this.authService.login();
    }
}