import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GoogleLogInComponent } from './components/google-log-in/google-log-in.component';
import { CguComponent } from './pages/cgu/cgu.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: GoogleLogInComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'cgu', component: CguComponent},
    {path: 'user', redirectTo: '/home'}
];
