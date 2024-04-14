import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Assurez-vous que cette voie d'accès est correcte

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/api/sessions`;
  constructor(private http: HttpClient) {}

  createSession(sessionData: { email: string, lat: number, lng: number }) {
    return this.http.post(`${this.apiUrl}`, sessionData);
  }

  // Ajoutez cette méthode pour récupérer les données de la dernière session
  getSessionData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest`); // Assurez-vous que 'latest' correspond à votre route API pour obtenir la dernière session
  }
  
}
